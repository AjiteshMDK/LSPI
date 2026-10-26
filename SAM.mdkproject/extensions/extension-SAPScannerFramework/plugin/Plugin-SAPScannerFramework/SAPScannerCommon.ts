// Enum representing different scanner modes
export const enum SAPScannerMode {
    SINGLE_SCAN = 'Single scan',
    MULTI_SCAN = 'Multi scan'
}

// Enum representing different selection modes
export const enum SAPScannerSelection {
    AUTOMATIC = 'Automatic',
    BATCH = 'Batch',
    AIM_AND_SCAN = 'Aim and scan',
    TAP_TO_SELECT = 'Tap to select'
}

// Enum representing different scanner formats
export const enum SAPScannerFormat {
    RAW_STRING = 'Raw String',
    GS1 = 'GS1'
}

// Interface for scanner parser
export interface ISAPScannerParser {
    parse(config: SAPScannerConfig, data: any): SAPScannerResult;
} 

// Class representing scanner configuration
export class SAPScannerConfig {
    public mode: SAPScannerMode;
    public selection: SAPScannerSelection;
    public format: SAPScannerFormat;

    // Constructor to initialize scanner configuration
    public constructor(
        mode: SAPScannerMode = SAPScannerMode.SINGLE_SCAN,
        selection: SAPScannerSelection = SAPScannerSelection.AUTOMATIC,
        format: SAPScannerFormat = SAPScannerFormat.RAW_STRING) {
        this.mode = mode;
        this.selection = selection;
        this.format = format;
    }
}

// Type representing scanner result
export type SAPScannerResult = {
    config: SAPScannerConfig;
    value: any;
}
