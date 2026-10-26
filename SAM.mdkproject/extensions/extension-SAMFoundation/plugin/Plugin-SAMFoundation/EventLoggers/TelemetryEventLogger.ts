
import { EventLogger, EventInfo } from './EventLogger';

export class TelemetryEventLogger extends EventLogger {
    private static _instance: TelemetryEventLogger;

    /**
     * Gets the instance of the TelemetryEventLogger.
     * @returns {TelemetryEventLogger} The instance of the TelemetryEventLogger.
     */
    public static getInstance(): TelemetryEventLogger {
        return this._instance || (this._instance = new this());
    }

    /**
     * Initializes the TelemetryEventLogger with the given configuration.
     * @param {any} context MDK context
     * @param {any} config The configuration for the event logger.
     * @async
     */
    public async init(context: any, config: any = undefined): Promise<Boolean> {
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
        return false;
    }

    /**
     * labels the start time of an event with the given event key.
     * @param {string} eventKey The unique key of the event.
     * @param {Boolean} isForced indicates if the event should be logged regardless of control flag
     * @returns {Boolean} True if the event time was cached successfully, false otherwise.
     */
    public logEventStart(eventKey: string, isForced?: Boolean): Boolean {
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
        return false;
    }
}
