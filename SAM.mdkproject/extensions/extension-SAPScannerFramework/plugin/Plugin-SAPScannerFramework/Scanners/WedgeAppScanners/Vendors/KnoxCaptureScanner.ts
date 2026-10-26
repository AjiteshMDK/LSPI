
import { SAPScannerResult, SAPScannerMode, SAPScannerConfig, ISAPScannerParser, SAPScannerFormat} from '../../../SAPScannerCommon';
import { ISAPScannerResultCallback } from '../../../SAPScannerFramework';
import { WedgeAppScanner } from '../WedgeAppScanner';

declare var android: any;

// Class representing the Samsung KnoxCapture Scanner, extending the WedgeAppScanner
export class KnoxCaptureScanner extends WedgeAppScanner {
    public static readonly PACKAGE_NAME = 'com.samsung.android.app.smartscan';
    public static readonly INTENT_ACTION_SCAN = 'com.samsung.knoxcapture.intent.action.RECEIVER';
    public static readonly INTENT_ACTION_HARD_KEY = 'com.samsung.android.knox.intent.action.HARD_KEY_REPORT';
    public static readonly HARD_KEY_REPORT_TYPE = 'com.samsung.android.knox.intent.extra.KEY_REPORT_TYPE';
    public static readonly INTENT_API_ACTION = 'com.samsung.android.knox.intent.api.ACTION';
    public static readonly INTENT_API_TRIGGER_ACTION = 'com.samsung.android.knox.intent.api.TRIGGER_ACTION';
    public static readonly SCAN_MODE = 'scanner_mode';
    public static readonly BARCODE_SELECTION = 'barcode_selection';
    public static readonly PENDING_INTENT = 'pending_intent';
    public static readonly PARSE_GS1 = 'parse_gs1';
    public static readonly TRIGGER_SCAN = 'START';
    public static readonly HARD_KEY_PUSHED = 2;

    // Constructor to initialize the MDKScanner with an optional parser implementation
    public constructor(appContext?: any, parserImpl?: ISAPScannerParser) {
        super(appContext, parserImpl ? parserImpl : new KnoxCaptureScannerParser());
    }

    /**
     * Initializes the KnoxCaptureScanner with the given context.
     * @param {any} hardwareConfig for the scanner hardware configurations.
     * @param {Boolean} isDemoMode for the scanner.
     * @return {Promise<boolean>} Promise that resolves to true if the scanner is successfully initialized, false otherwise.
     */
    public async initialize(hardwareConfig: any, isDemoMode: Boolean): Promise<boolean> {
        // initialize scanner framework
        if (await super.initialize(hardwareConfig, isDemoMode) === false || !this._wedgeAppBridge ||
           !this._wedgeAppBridge.isWedgeAppInstalled(KnoxCaptureScanner.PACKAGE_NAME)) {
            return Promise.resolve(false);
        }
        try {
            const actions = [
                KnoxCaptureScanner.INTENT_ACTION_SCAN,
                KnoxCaptureScanner.INTENT_ACTION_HARD_KEY,
            ];
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
     * Handles the receiver callback.
     * @param {any} context Context to handle the receiver callback.
     * @param {any} intent Intent to handle.
     */
    public onWedgeAppReceive(context: any, intent: any): void {
        if (!intent) return;
    
        const action = intent.getAction();
        if (!action) return;
    
        switch (action) {
            case KnoxCaptureScanner.INTENT_ACTION_SCAN:
                this.onScannerResult(true, intent);
                break;
    
            case KnoxCaptureScanner.INTENT_ACTION_HARD_KEY:
                const extras = intent.getExtras();
                if (!extras) return;
    
                const keyReportType = extras.getInt(KnoxCaptureScanner.HARD_KEY_REPORT_TYPE);
                if (keyReportType === KnoxCaptureScanner.HARD_KEY_PUSHED) {
                    this.onHardKeyPushed();
                }
                break;
    
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

        const intent = new android.content.Intent();
        intent.setPackage(KnoxCaptureScanner.PACKAGE_NAME);
        intent.setAction(KnoxCaptureScanner.INTENT_API_ACTION);

        intent.putExtra(KnoxCaptureScanner.INTENT_API_TRIGGER_ACTION, KnoxCaptureScanner.TRIGGER_SCAN);
        intent.putExtra(KnoxCaptureScanner.SCAN_MODE, config.mode);
        intent.putExtra(KnoxCaptureScanner.BARCODE_SELECTION, config.selection);
        intent.putExtra(KnoxCaptureScanner.PARSE_GS1, config.format === SAPScannerFormat.GS1);

        this._wedgeAppBridge?.sendIntent(intent, KnoxCaptureScanner.PENDING_INTENT);
    }
}

// Class representing the KnoxCapture Scanner Parser, implementing the ISAPScannerParser interface
export class KnoxCaptureScannerParser implements ISAPScannerParser {
    public static readonly SCANNED_BUNDLE_LIST = 'com.samsung.smartscan.scanned_bundle_list';
    public static readonly UNPROCESSED_STRING_DATA = 'com.samsung.smartscan.unprocessed_string_data';
    public static readonly GS1_DATA = 'com.samsung.smartscan.gs1_ai_json_parsed_data';

    /**
     * Parses the data and returns a scanner result.
     * @param {SAPScannerConfig} config Configuration for the scanner.
     * @param {any} data Data to be parsed.
     * @returns {SAPScannerResult} Parsed scanner result.
     */
    public parse(config: SAPScannerConfig, data: any): SAPScannerResult {
        const scannedBundleList = data.getParcelableArrayListExtra(KnoxCaptureScannerParser.SCANNED_BUNDLE_LIST);
        if (!scannedBundleList) {
            return { config: config, value: config.mode === SAPScannerMode.SINGLE_SCAN ? '' : [''] };
        }

        const parsedData: any = [];
        for (let i = 0; i < scannedBundleList.size(); i++) {
            const jsonData = scannedBundleList.get(i).getString(KnoxCaptureScannerParser.GS1_DATA);
            if (jsonData) {
                parsedData.push(JSON.parse(jsonData));
            } else {
                parsedData.push(
                    this.stringJoin(scannedBundleList.get(i).getStringArrayList(
                        KnoxCaptureScannerParser.UNPROCESSED_STRING_DATA), ','));
            }
        }

        return { config: config, value: config.mode === SAPScannerMode.SINGLE_SCAN ? parsedData[0] : parsedData };
    }

    /**
     * Joins the strings in the given list with the given splitter.
     * @param {any} strings List of strings to join.
     * @param {string} splitter Splitter to join the strings.
     */
    private stringJoin(strings: any, splitter: string): string {
        let result = '';
        for (let i = 0; i < strings.size(); i++) {
            if (i > 0) {
                result += splitter;
            }
            result += strings.get(i);
        }
        return result;
    }
}
