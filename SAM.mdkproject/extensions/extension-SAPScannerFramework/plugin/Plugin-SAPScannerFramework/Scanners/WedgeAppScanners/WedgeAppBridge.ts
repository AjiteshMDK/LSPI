import { Injectable } from '../../../extension-SAMFoundation/Common/Decorators';

declare var android: any;

// Interface for the WedgeAppReceiver
export interface IWedgeAppReceiver {
    onWedgeAppReceive(context: any, intent: any): void;
}

// Class representing the WedgeAppBridge
@Injectable()
export class WedgeAppBridge {
    private _appContext: any;
    private _broadcastReceiver: any;

    constructor(appContext?: any) {
        this._appContext = appContext;
    }

    /**
     * Register a broadcast receiver to listen for the specified actions
     * @param listener The listener to call when an action is received
     * @param actions The actions to listen for
     * @returns {boolean} True if the broadcast receiver was registered successfully, false otherwise
     */
    public registerReceiver(listener: IWedgeAppReceiver, actions: string[]): boolean {
        if (listener && actions) {
            const intentFilter = new android.content.IntentFilter();
            for (const action of actions) {
                intentFilter.addAction(action);
            }
            try {
                const receiverImpl = android.content.BroadcastReceiver.extend({
                    onReceive: (context: any, intent: any) => {
                        listener.onWedgeAppReceive(context, intent);
                    },
                });
                this._broadcastReceiver = new receiverImpl();
                if (android.os.Build.VERSION.SDK_INT >= 34) {
                    this._appContext?.registerReceiver(this._broadcastReceiver, intentFilter, android.content.Context.RECEIVER_EXPORTED);
                } else {
                    this._appContext?.registerReceiver(this._broadcastReceiver, intentFilter);
                }
                return true;
            } catch (e) {
                console.error('registerReceiver Exception: ', e);
                return false;
            }
        }
        return false;
    }

    /**
     * Unregister the broadcast receiver
     * @param broadcastReceiver The broadcast receiver to unregister
     * @param actions The actions to listen for
     */
    public unregisterReceiver(): void {
        if (this._broadcastReceiver) {
            try {
                this._appContext?.unregisterReceiver(this._broadcastReceiver);
            } catch (e) {
                console.error('unregisterReceiver Exception: ', e);
            }
        }
    }

    /**
     * Check if the specified app is installed
     * @param appName The name of the app to check
     * @returns {boolean} True if the app is installed, false otherwise
     */
    public isWedgeAppInstalled(appName: string): boolean {
        try {
            this._appContext?.getPackageManager().getPackageInfo(appName, android.content.pm.PackageManager.GET_ACTIVITIES);
            return true;
        } catch (e) {
            console.error('isWedgeAppInstalled Exception: ', e);
            return false;
        }
    }

    /**
     * Send an intent
     * @param intent The intent to send
     * @param pendingIntentKey The key for the pending intent
     */
    public sendIntent(intent: any, pendingIntentKey?: String): void {
        if (pendingIntentKey) {
            const pendingIntentValue = android.app.PendingIntent.getBroadcast(this._appContext, 0, this._appContext.getIntent(),
                android.app.PendingIntent.FLAG_UPDATE_CURRENT | android.app.PendingIntent.FLAG_IMMUTABLE);
            intent.putExtra(pendingIntentKey, pendingIntentValue);
        }
        this._appContext?.sendBroadcast(intent);
    }
}
