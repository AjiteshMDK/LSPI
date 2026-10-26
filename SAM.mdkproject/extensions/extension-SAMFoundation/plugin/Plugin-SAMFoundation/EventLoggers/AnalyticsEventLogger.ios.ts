
import { AnalyticsEventLoggerCommon } from './AnalyticsEventLogger.common';

declare var Analytics: any;

export class AnalyticsEventLogger extends AnalyticsEventLoggerCommon {
    private static _instance: AnalyticsEventLogger;
    private analytics: any;

    public static getInstance(): AnalyticsEventLogger {
        if (!AnalyticsEventLogger._instance) {
            AnalyticsEventLogger._instance = new AnalyticsEventLogger();
        }
        return AnalyticsEventLogger._instance;
    }

    public async init(context: any, config: any): Promise<Boolean> {
        if (await super.init(context, config) === false) {
            return Promise.resolve(false);
        }
        this.analytics = new Analytics(config);
        return Promise.resolve(true);
    }

    public logEvent(eventInfo: string): Boolean {
        if (this.isAllowed()) {
            this.analytics.logEvent(eventInfo);
            return true;
        }
        return false;
    }

    public isAllowed(isForced: Boolean | undefined = true): Boolean {
        return super.isAllowed(isForced) && this.analytics;
    }
}
