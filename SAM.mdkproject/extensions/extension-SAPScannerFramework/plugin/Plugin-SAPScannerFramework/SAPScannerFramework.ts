
import { SAPScannerConfig, SAPScannerResult, ISAPScannerParser } from "./SAPScannerCommon";
import { TelemetryEventLogger } from '../extension-SAMFoundation/EventLoggers/TelemetryEventLogger';

// Interface for scanner listener
export interface ISAPScannerListener {
    onScannerResult: (isSuccess: boolean, data: any) => void;
    onScannerTimeout: () => void;
}

// Interface for hard key pushed listener
export interface ISAPScannerHardKeyPushedListener {
    onHardKeyPushed: (context: any) => void;
}

// Interface for unsolicited scanner result listener
export interface ISAPScannerUnsolResultListener {
    onScannerUnsolResult: (context: any, result: SAPScannerResult) => void;
}

// Interface for scanner result callback internally used by scanner implementations
export interface ISAPScannerResultCallback {
    (isSuccess: boolean, result?: SAPScannerResult) : void;
}

// Default implementation of scanner parser
export class DefaultSAPScannerParser implements ISAPScannerParser {
    /**
     * Parses the data and returns a scanner result.
     * @param {SAPScannerConfig} config Configuration for the scan.
     * @param {any} data Data to be parsed.
     * @return {SAPScannerResult} Parsed scanner result.
     */
    public parse(config: SAPScannerConfig, data: any): SAPScannerResult {
        return { config: config, value: data };
    }
}

// Class representing the scanner
export class SAPScanner implements ISAPScannerListener {
    protected _onScannerResultCallback?: ISAPScannerResultCallback;
    protected _onScannerConfig?: SAPScannerConfig;
    protected _onHardKeyPushedListener?: ISAPScannerHardKeyPushedListener;
    protected _onHardKeyPushedContext: any;
    protected _onUnsolResultListener?: ISAPScannerUnsolResultListener;
    protected _onUnsolResultContext: any;
    protected _onUnsolScannerConfig?: SAPScannerConfig;
    protected _parser: ISAPScannerParser;
    protected _isDemoMode: Boolean = false;

    // Constructor to initialize scanner with optional parser
    public constructor(parser?: ISAPScannerParser) {
        this._parser = parser ? parser : new DefaultSAPScannerParser();
    }

    /**
     * Initializes the scanner with the given context.
     * @param {any} hardwareConfig for the scanner hardware configurations.
     * @param {Boolean} isDemoMode Indicates if the scanner is in demo mode.
     * @return {Promise<boolean>} Promise indicating the success of the initialization.
     */
    public async initialize(hardwareConfig: any, isDemoMode: Boolean): Promise<boolean> {
        this._isDemoMode = isDemoMode;
        return Promise.resolve(true);
    }

    /**
     * Cleans up the scanner.
     */
    public cleanup(): void { }

    /**
     * Triggers a scan with the given configuration.
     * @param {SAPScannerConfig} config Configuration for the scan.
     * @return {Promise<SAPScannerResult>} Promise that resolves to the scanner result.
     */
    public async triggerScan(config: SAPScannerConfig = new SAPScannerConfig()): Promise<SAPScannerResult> {
        return new Promise((resolve, reject) => {
            const callback: ISAPScannerResultCallback = (isSuccess: boolean, result?: SAPScannerResult) => {
                (isSuccess && result) ? resolve(result) : reject(new Error(result?.value));
            };
            this.triggerScanInternal(callback, config);
        });
    }

    /**
     * Checks if the scanner is currently scanning.
     * @return {boolean} True if the scanner is scanning, false otherwise.
     */
    public isScanning(): boolean {
        return this._onScannerResultCallback !== undefined;
    }

    /**
     * Sets the hard key press listener.
     * @param {any} context Context for the hard key press.
     * @param {ISAPScannerHardKeyPushedListener} listener Listener for hard key press.
     */
    public setHardKeyPushedListener(context: any, listener: ISAPScannerHardKeyPushedListener) {
        this._onHardKeyPushedContext = context;
        this._onHardKeyPushedListener = listener;
    }

    /**
     * Sets the scanner result listener.
     * @param {any} context Context for the scanner result.
     * @param {ISAPScannerUnsolResultListener} listener Listener for unsolicited scanner result.
     */
    public setUnsolResultListener(context: any, listener: ISAPScannerUnsolResultListener,
        config: SAPScannerConfig) {
        this._onUnsolResultContext = context;
        this._onUnsolResultListener = listener;
        this._onUnsolScannerConfig = config;
    }

    /**
     * Handles the scanner result.
     * @param {boolean} isSuccess Indicates if the scan was successful.
     * @param {any} data Data from the scan.
     */
    public onScannerResult(isSuccess: boolean, data: any): void {
        // Log telemetry event for scanner
        TelemetryEventLogger.getInstance().logEvent({
            eK: 'X_EXT_SCANNER',
            sE: 'sy.ext.enable',
            mI: 't' + this.constructor.name,
        }, !this._isDemoMode);

        // Handle the scanner result
        if (this._onScannerResultCallback) { // promising scan
            this._onScannerResultCallback(isSuccess, this._parser.parse(this._onScannerConfig!, data));
            this._onScannerResultCallback = undefined;
        } else { // unsolicited scan. e.g. Zebra scanner
            this._onUnsolResultListener?.onScannerUnsolResult(
                this._onUnsolResultContext, this._parser.parse(this._onUnsolScannerConfig!, data));
        }
    }

    /**
     * Handles the scanner timeout.
     */
    public onScannerTimeout(): void {
        if (this._onScannerResultCallback) {
            this._onScannerResultCallback(false, undefined);
            this._onScannerResultCallback = undefined;
        }
    }

    /**
     * Handles the hard key press event.
     * @param {any} context Context for the hard key press.
     */
    public onHardKeyPushed(context: any = this._onHardKeyPushedContext): void {
        if (!this.isScanning()) {
            this._onHardKeyPushedListener?.onHardKeyPushed(context);
        }
    }

    /**
     * Internal method to trigger a scan with the given configuration and result callback.
     * @param {ISAPScannerResultCallback} onScannerResult Callback function to handle the scan result.
     * @param {SAPScannerConfig} config Configuration for the scan.
     */
    protected triggerScanInternal(onScannerResult: ISAPScannerResultCallback, config: SAPScannerConfig): void {
        this._onScannerResultCallback = onScannerResult;
        this._onScannerConfig = config;
    }
}
