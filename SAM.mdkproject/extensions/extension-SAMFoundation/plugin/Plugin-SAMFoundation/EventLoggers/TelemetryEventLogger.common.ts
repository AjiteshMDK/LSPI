
import { EventLogger, EventInfo } from './EventLogger';
import { LoggerManager } from 'mdk-sap';

export class TelemetryEventLoggerCommon extends EventLogger {
    public static readonly FEATURE_FLAG_NAME = 'Telemetry';

    public startTimeMap: Map<string, Date> = new Map();
    public isEscapeQuotes: Boolean = false;

    /**
     * Initializes the TelemetryEventLogger with the given configuration.
     * @param {any} context MDK context
     * @param {any} config The configuration for the event logger.
     * @async
     */
    public async init(context: any, config: any = undefined): Promise<Boolean> {
        if (await super.init(context, TelemetryEventLoggerCommon.FEATURE_FLAG_NAME) === false) {
            return Promise.resolve(false);
        }
        try {
            if (LoggerManager.getInstance() === null) {
                return Promise.resolve(false);
            }
        } catch (error) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }

    /**
     * logs an event with the given event information.
     * @param {EventInfo} eventInfo The event information to log.
     * @param {Boolean} isForced indicates if the event should be logged regardless of control flag
     * @param {Date} date The date of the event.
     * @param {Number} duration The duration of the event.
     * @returns {Boolean} True if the event was logged successfully, false otherwise.
     */
    public logEvent(eventInfo: EventInfo, isForced?: Boolean, date: Date = new Date(), duration: Number = 0): Boolean {
        if (this.isAllowed(isForced)) {
            const bandwidthSize = 128, mandatoryFieldSize = 25, optionalFieldSize = 12;
            const charsPerField = eventInfo.mI === undefined ?
                (bandwidthSize - mandatoryFieldSize) / 2 :
                (bandwidthSize - mandatoryFieldSize - optionalFieldSize) / 3;
            for (const key of Object.keys(eventInfo) as (keyof EventInfo)[]) {
                const value = eventInfo[key];
                if (value !== undefined && typeof value === 'string' && value.length > charsPerField) {
                    eventInfo[key] = value.substring(0, charsPerField) as typeof value;
                }
            }
            const jsonString = JSON.stringify(eventInfo).replace(/"/g, this.isEscapeQuotes ? '\\"' : '"');
            LoggerManager.getInstance()._storeCustomEvent(jsonString, date, duration);
            return true;
        }
        return false;
    }

    /**
     * labels the start time of an event with the given event key.
     * @param {string} eventKey The unique key of the event.
     * @param {Boolean} isForced indicates if the event should be logged regardless of control flag
     * @returns {Boolean} True if the event time was cached successfully, false otherwise.
     */
    public logEventStart(eventKey: string, isForced?: Boolean): Boolean {
        if (this.isAllowed(isForced)) {
            // Check if the event key already exists in the map
            if (this.startTimeMap.has(eventKey)) {
                throw new Error(`Event key ${eventKey} already exists in the map.`);
            }
            // Store the current date and time in the map
            this.startTimeMap.set(eventKey, new Date());
            return true;
        }
        return false;
    }

    /**
     * shoots the end time of an event with the given event key.
     * @param {string} eventKey The unique key of the event.
     * @param {EventInfo} eventInfo The event information to log.
     * @param {Boolean} isForced If true, the event will be logged even if the logging is disabled.
     * @returns {Boolean} True if the event was logged successfully, false otherwise.
     */
    public logEventEnd(eventKey: string, eventInfo: EventInfo, isForced?: Boolean): Boolean {
        if (this.isAllowed(isForced)) {
            // Check if the event key exists in the map
            const startTime = this.startTimeMap.get(eventKey);
            if (!startTime) {
                throw new Error(`Event key ${eventKey} does not exist in the map.`);
            }
            // Calculate the duration in seconds
            const duration = (Date.now() - startTime.getTime()) / 1000;
            // Remove the start time from the map
            this.startTimeMap.delete(eventKey);
            // Log the event with the duration
            return this.logEvent(eventInfo, isForced, new Date(), duration);
        }
        return false;
    }
}
