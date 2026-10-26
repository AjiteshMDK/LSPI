
import { TelemetryEventLoggerCommon } from './TelemetryEventLogger.common';

export class TelemetryEventLogger extends TelemetryEventLoggerCommon {
    private static _instance: TelemetryEventLogger;

    public static getInstance(): TelemetryEventLogger {
        if (!TelemetryEventLogger._instance) {
            TelemetryEventLogger._instance = new TelemetryEventLogger();
        }
        return TelemetryEventLogger._instance;
    }

    public async init(context: any, config: any = undefined): Promise<Boolean> {
        this.isEscapeQuotes = false;
        return super.init(context, config);
    }
}
