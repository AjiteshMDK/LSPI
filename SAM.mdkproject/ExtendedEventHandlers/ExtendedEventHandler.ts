import { Logger } from 'mdk-core/utils/Logger';
import { MapAuthenticator } from 'extension-MapAuthenticator';
declare var com: any;

export class ExtendedEventHandler {
    private _resumedAct = null;

    public onActivityCreated(args: any) {
        Logger.instance.appDelegate.info("ExtendedEventHandler onActivityCreated");
        // Insert your extended event handling code here
        this._resumedAct = args.activity;
        const activityType = this._resumedAct.getClass().getSimpleName();
        if (activityType === 'MDKAndroidActivity') {
            MapAuthenticator.getInstance().create(args.activity, 'ESRI');
        }        
    }

    public onActivityResumed(args: any) {
        Logger.instance.appDelegate.info("ExtendedEventHandler onActivityResumed");
        // Insert your extended event handling code here
    }

    public onActivityPaused(args: any) {
        Logger.instance.appDelegate.info("ExtendedEventHandler onActivityPaused");
        // Insert your extended event handling code here
    }
}

