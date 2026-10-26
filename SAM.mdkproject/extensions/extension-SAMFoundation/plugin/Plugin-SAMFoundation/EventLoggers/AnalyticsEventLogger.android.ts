
import { AnalyticsEventLoggerCommon } from './AnalyticsEventLogger.common';
import * as app from '@nativescript/core/application';

declare var com;
declare var java;

export class AnalyticsEventLogger  extends AnalyticsEventLoggerCommon {
    private static _instance: AnalyticsEventLogger;
    private _initCompleteCallback?: IInitCompleteCallback;
    private _isInitComplete: Boolean = false;
    private _nativeAnalytics: any;

    private constructor() {
        super();
        this._nativeAnalytics = new com.sap.sam.android.plugin.samfoundation.analytics.AnalyticsManager();
    }

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
        return new Promise((resolve, reject) => {
            this._initCompleteCallback = (isSuccess: Boolean, errorMessage?: string) => {
                isSuccess ? resolve(true) : reject(new Error(errorMessage));
            };
            this._nativeAnalytics?.initWithUserData(app.android.context, config, new AnalyticsManagerDelegate(this));
        });
    }

    public logEvent(eventInfo: string): Boolean {
        if (this.isAllowed()) {
            this._nativeAnalytics.launchEngageActivity(app.android.context, eventInfo);
            return true;
        }
        return false;
    }

    public onInitComplete(isSuccess: Boolean, errorMessage: string) {
        this._isInitComplete = isSuccess;
        if (this._initCompleteCallback) {
            this._initCompleteCallback(isSuccess, errorMessage);
        }
    }

    public isAllowed(isForced: Boolean | undefined = true): Boolean {
        return super.isAllowed(isForced) && this._isInitComplete && this._nativeAnalytics;
    }
}

interface IAnalyticsManagerDelegate {
    onInitComplete: (isSuccess: Boolean, errorMessage: string) => void,
}

interface IInitCompleteCallback {
    (isSuccess: Boolean, errorMessage?: string) : void;
}

@NativeClass()
@Interfaces([com.sap.sam.android.plugin.samfoundation.analytics.IAnalyticsManagerDelegate])
class AnalyticsManagerDelegate extends java.lang.Object {
    private _impl: IAnalyticsManagerDelegate;

    public constructor(impl: IAnalyticsManagerDelegate) {
        super();
        this._impl = impl;
    }

    public onInitComplete(isSuccess: Boolean, errorMessage: string) {
        if (this._impl) {
            this._impl.onInitComplete(isSuccess, errorMessage);
        }
    }
}
