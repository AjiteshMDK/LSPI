/**
* Describe this function...
* @param {IClientAPI} context
*/
import DownloadDefiningRequest from '../OData/Download/DownloadDefiningRequest';
import libCom from '../Common/Library/CommonLibrary';
import ApplicationSettings from '../Common/Library/ApplicationSettings';

export default function PerformAppUpdateCheck(context) {
    // skip app update check if in demo mode or not initial sync
    if (!libCom.isInitialSync(context) || context.isDemoMode()) {
        let userSwitchDeltaCompleted =  ApplicationSettings.getBoolean(context, 'didUserSwitchDeltaCompleted', null);
        if (userSwitchDeltaCompleted !== null && !userSwitchDeltaCompleted) { // dont do any download if user switch delta is in progress
            return Promise.resolve();
        } else {
            return DownloadDefiningRequest(context);  
        }          
    } else if (libCom.isInitialSync(context)) {
        return context.executeAction('/SAPAssetManager/Actions/Common/PerformAppUpdateCheck.action');
    }
}

