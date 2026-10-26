import EnableTracking from './EnableTracking';
import GetCurrentLocation from './GetCurrentLocation';
import StartTracking from './StartTracking';
import StopTracking from './StopTracking';
import StopTrackingWindows from './StopTrackingWindows';
import IsWindows from '../../Common/IsWindows';

export default class ServiceManager {
    constructor() {
        this._instance = null;
        this._isEnabled = false;
        this._watchIDs = [];
    }

    static getInstance() {
        return this._instance || (this._instance = new this());
    }

    enableTracking(context) {
        if (!this._isEnabled) {
            return EnableTracking(context).then((isEnabled) => {
                if (isEnabled) {
                    this._isEnabled = true;
                    return Promise.resolve(true);
                }
                return Promise.resolve(false);
            }, () => {
                return Promise.resolve(false);
            });
        }
        return Promise.resolve(true);
    }

    disableTracking(context) {
        if (this._isEnabled) {
            while (this._watchIDs.length) {
                IsWindows(context)? StopTrackingWindows(context,this._watchIDs.pop()): StopTracking(this._watchIDs.pop());
            }
            this._isEnabled = false;
        }
    }

    isTrackingEnabled() {
        return this._isEnabled;
    }

    startTracking(cbFunc, cbParam = undefined, updateDistance = undefined, context) {
        let watchID = StartTracking(cbFunc, cbParam, updateDistance, context);
        if (watchID > 0) {
            this._watchIDs.push(watchID);
        }
        return watchID;
    }

    ///Seems to be Android only
    stopTracking(watchID) {
        const pos = this._watchIDs.indexOf(watchID);
        if (pos) {
            StopTracking(watchID);
            this._watchIDs.splice(pos, 1);
        }
    }

    getCurrentLocation(context) {
        if (this._isEnabled) {
            return GetCurrentLocation(context);
        }
        return Promise.resolve();
    }
}
