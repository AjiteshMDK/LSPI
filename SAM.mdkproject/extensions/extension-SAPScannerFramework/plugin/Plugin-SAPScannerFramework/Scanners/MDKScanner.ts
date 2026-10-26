// Import necessary modules and classes
import { SAPScannerResult, SAPScannerConfig, SAPScannerMode, ISAPScannerParser } from '../SAPScannerCommon';
import { SAPScanner, ISAPScannerResultCallback,  } from '../SAPScannerFramework';
import { BarcodeScannerBridge } from 'mdk-sap';

// Class representing the MDK Scanner, extending the SAPScanner class
export class MDKScanner extends SAPScanner {
    // Callbacks for handling scanner results and errors
    private callbacks = {
        finishedScanningWithResults(data: any) {
            this.self.onScannerResult(true, data);
        },
        finishedCheckingWithResults(data: any) {
            BarcodeScannerBridge.getInstance().open({}, this);
        },
        finishedScanningWithErrors(data: any) {
            this.self.onScannerResult(false, data);
        },
        finishedCheckingWithErrors(data: any) {
            this.self.onScannerResult(false, data);
        },
        self: this,
    };

    // Constructor to initialize the MDKScanner with an optional parser implementation
    public constructor(parserImpl?: ISAPScannerParser) {
        super(parserImpl ? parserImpl : new MDKScannerParser());
    }

    protected triggerScanInternal(onScannerResult: ISAPScannerResultCallback, config: SAPScannerConfig): void {
        super.triggerScanInternal(onScannerResult, config);
        if (config.mode === SAPScannerMode.MULTI_SCAN) {
            onScannerResult(false, { config: config, value: 'Multi-scan not supported' });
            return;
        }
        BarcodeScannerBridge.getInstance().checkPrerequisite({}, this.callbacks);
    }
}

// Class representing the MDK Scanner Parser, implementing the ISAPScannerParser interface
export class MDKScannerParser implements ISAPScannerParser {
    /**
     * Parses the data and returns a scanner result.
     * @param {any} data Data to be parsed.
     * @return {SAPScannerResult} Parsed scanner result.
     */
    public parse(config: SAPScannerConfig, data: any): SAPScannerResult {
        return { config: config, value: data };
    }
}
