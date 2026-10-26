
import { EventLogger } from './EventLogger';

export class AnalyticsEventLoggerCommon extends EventLogger {
    public static readonly FEATURE_FLAG_NAME = 'Alchemer';

    public async init(context: any, config: any = undefined): Promise<Boolean> {
        if (await super.init(context, AnalyticsEventLoggerCommon.FEATURE_FLAG_NAME) === false) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }
}
