
import { ClientSettings } from '../ClientSettings/ClientSettings';

// EventLogger base class
export class EventLogger {
    /**
     * Flag indicating whether the event logger is enabled.
     */
    private _isFeatureFlagEnabled: Boolean = false;

    /**
     * Initializes the event logger with the given configuration.
     * @param {any} context MDK context
     * @param {any} config The configuration for the event logger.
     * @returns {Promise<Boolean>} A promise that resolves to true if the event logger is initialized successfully, false otherwise.
     * @async
     */
    public async init(context: any, config: any = ''): Promise<Boolean> {
        const featureFlagName = config; // config is the feature flag name in this case
        if (!ClientSettings.getInstance().isFeatureFlagsCached()) {
            return ClientSettings.getInstance().cacheFeatureFlags(context).then(() => {
                this._isFeatureFlagEnabled = ClientSettings.getInstance().isFeatureFlagEnabled(featureFlagName);
                return Promise.resolve(this._isFeatureFlagEnabled);
            });
        }
        this._isFeatureFlagEnabled = ClientSettings.getInstance().isFeatureFlagEnabled(featureFlagName);
        return Promise.resolve(this._isFeatureFlagEnabled);
    }

    /**
     * Logs an event with the given event or key.
     * @param {string | EventInfo} eventInfo The event information to log.
     * @param {Boolean} isForced indicates if the event should be logged regardless of control flag
     * @param {Date} date The date of the event.
     * @param {Number} duration The duration of the event.
     */
    public logEvent(eventInfo: string | EventInfo, isForced?: Boolean, date?: Date, duration?: Number): Boolean {
        return true;
    }

    /**
     * Checks if the event should be logged based on the feature flag and forced logging
     * @param {Boolean | undefined} isForced indicates if the event should be logged regardless of control flag
     * @returns {Boolean} True if the event should be logged, false otherwise.
     */
    public isAllowed(isForced: Boolean | undefined): Boolean {
        return this._isFeatureFlagEnabled && (isForced === undefined || isForced === true);
    }
}

// EventInfo type definition
export type EventInfo = {
    eK: string;
    sE: string;
    mI: string | undefined;
}
