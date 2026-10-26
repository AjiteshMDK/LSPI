
import { SAPScannerResult, SAPScannerConfig, SAPScannerMode, ISAPScannerParser} from '../../../SAPScannerCommon';
import { ISAPScannerResultCallback, ISAPScannerUnsolResultListener } from '../../../SAPScannerFramework';
import { WedgeAppScanner } from '../WedgeAppScanner';

declare var android: any;

// Class representing the Zebra Scanner, extending the WedgeAppScanner
export class ZebraScanner extends WedgeAppScanner {
    public static readonly INTENT_ACTION_SCAN = 'com.zebra.android.intent.action.SCAN';
    public static readonly INTENT_API_ACTION = 'com.symbol.datawedge.api.ACTION';
    public static readonly INTENT_API_TRIGGER_ACTION = 'com.symbol.datawedge.api.SOFT_SCAN_TRIGGER';
    public static readonly TRIGGER_SCAN = 'TOGGLE_SCANNING';

    // Constructor to initialize the MDKScanner with an optional parser implementation
    public constructor(appContext?: any, parserImpl?: ISAPScannerParser) {
        super(appContext, parserImpl ? parserImpl : new ZebraScannerParser());
    }

    /**
     * Initializes the KnoxCaptureScanner with the given context.
     * @param {any} hardwareConfig for the scanner hardware configurations.
     * @param {Boolean} isDemoMode for the scanner.
     * @return {Promise<boolean>} Promise that resolves to true if the scanner is successfully initialized, false otherwise.
     */
    public async initialize(hardwareConfig: any, isDemoMode: Boolean): Promise<boolean> {
        // initialize scanner framework
        if (await super.initialize(hardwareConfig, isDemoMode) === false || !this._wedgeAppBridge) {
            return Promise.resolve(false);
        }
        try {
            const actions = [ZebraScanner.INTENT_ACTION_SCAN];
            return Promise.resolve(this._wedgeAppBridge.registerReceiver(this, actions));
        } catch (error) {
            console.error('Failed to initialize ZebraScanner:', error);
            return Promise.resolve(false);
        }
    }

    /**
     * Cleans up the KnoxCaptureScanner.
     */
    public cleanup(): void {
        this._wedgeAppBridge?.unregisterReceiver();
    }

    /**
     * Sets the unsolicited result listener.
     * @param {any} context Context for the unsolicited result.
     * @param {ISAPScannerUnsolResultListener} listener Listener for unsolicited result.
     * @param {SAPScannerConfig} config Configuration for the unsolicited result.
     */
    public setUnsolResultListener(context: any, listener: ISAPScannerUnsolResultListener,
        config: SAPScannerConfig): void {
        // in case set specific config for unsol result
        super.setUnsolResultListener(context, listener, config);
    }

    /**
     * Handles the receiver callback.
     * @param {any} context Context to handle the receiver callback.
     * @param {any} intent Intent to handle.
     */
    public onWedgeAppReceive(context: any, intent: any): void {
        switch (intent?.getAction()) {
            case ZebraScanner.INTENT_ACTION_SCAN: {
                this.onScannerResult(true, intent);
                break;
            }
            default:
                break;
        }
    }

    /**
     * Triggers a scan with the given configuration and result callback.
     * @param {function} onScannerResult Callback function to handle the scan result.
     * @param {SAPScannerConfig} config Configuration for the scan.
     */
    protected triggerScanInternal(onScannerResult: ISAPScannerResultCallback, config: SAPScannerConfig): void {
        super.triggerScanInternal(onScannerResult, config);
        if (config.mode === SAPScannerMode.MULTI_SCAN) {
            onScannerResult(false, { config: config, value: 'Multi-scan not supported' });
            return;
        }
        const intent = new android.content.Intent();
        intent.setAction(ZebraScanner.INTENT_API_ACTION);
        intent.putExtra(ZebraScanner.INTENT_API_TRIGGER_ACTION, ZebraScanner.TRIGGER_SCAN);

        this._wedgeAppBridge?.sendIntent(intent);
    }
}

// Class representing the KnoxCapture Scanner Parser, implementing the ISAPScannerParser interface
export class ZebraScannerParser implements ISAPScannerParser {
    public static readonly DATA_STRING = 'com.symbol.datawedge.data_string';
    /**
     * Parses the data and returns a scanner result.
     * @param {any} data Data to be parsed.
     * @return {SAPScannerResult} Parsed scanner result.
     */
    public parse(config: SAPScannerConfig, data: any): SAPScannerResult {
        const scanVal = data.getStringExtra(ZebraScannerParser.DATA_STRING);
        return { config: config, value: scanVal };
    }
}
