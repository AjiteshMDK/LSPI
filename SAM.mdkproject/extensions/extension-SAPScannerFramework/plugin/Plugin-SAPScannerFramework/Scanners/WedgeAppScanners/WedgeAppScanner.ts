import { SAPScanner } from '../../SAPScannerFramework';
import { WedgeAppBridge, IWedgeAppReceiver } from './WedgeAppBridge';
import { Injectable, Inject, Container } from '../../../extension-SAMFoundation/Common/Decorators';

// Class representing the WedgeAppScanner
@Injectable()
export class WedgeAppScanner extends SAPScanner implements IWedgeAppReceiver {

    @Inject(WedgeAppBridge)
    protected _wedgeAppBridge?: WedgeAppBridge;

    constructor(appContext?: any, parserImpl?: any) {
        super(parserImpl); // pass the parser implementation to the parent class
        Container.set(WedgeAppBridge, new WedgeAppBridge(appContext));
    }

    /**
     * Handles the receiver callback.
     * @param {any} context Context to handle the receiver callback.
     * @param {any} intent Intent to handle.
     */
    public onWedgeAppReceive(context: any, intent: any): void { }
}
