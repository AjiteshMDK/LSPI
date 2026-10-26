/**
 * Handles synchronization, including initial and delta syncs.
 * For delta syncs: Cleans up unused entities, clears error states, removes temporary settings, and reinitializes and uploads offline data.
 * For initial syncs: Initializes defining requests for a full data download.
 * 
 * @param {object} clientAPI - The client API object providing methods for handling MDK client-side actions and data.
 * @returns {Promise} A promise that resolves once the sync process is complete or rejects if an error occurs.
 */
import DeleteUnusedOverviewEntities from '../Confirmations/Init/DeleteUnusedOverviewEntities';
import setSyncInProgressState from '../Sync/SetSyncInProgressState';
import errorLibrary from '../Common/Library/ErrorLibrary';
import libCom from '../Common/Library/CommonLibrary';
import libVal from '../Common/Library/ValidationLibrary';
import Logger from '../Log/Logger';
import appSettings from '../Common/Library/ApplicationSettings';
import SDFIsFeatureEnabled from '../Forms/SDF/SDFIsFeatureEnabled';
//import updateOnlineXSUAATokenEntity from '../Forms/SDF/updateOnlineXSUAATokenEntity';
import ODataLibrary from '../OData/ODataLibrary';

export default async function SyncData(clientAPI) {
    clientAPI.getClientData().Error='';
    libCom.removeStateVariable(clientAPI, 'isAnyWorkOrderStarted');

    if (SDFIsFeatureEnabled(clientAPI)) {
        // appSettings.setBoolean(clientAPI, 'SDFCacheFlush', true);
        // const success = await updateOnlineXSUAATokenEntity(clientAPI, '');
        // if (!success) {
        //     Logger.error(clientAPI.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategorySync.global').getValue(),`Failure to update xsuaa token: ${success}`);

        //     setSyncInProgressState(clientAPI, false);
        //     return false;
        // }
    }

    if (!libCom.isInitialSync(clientAPI)) {
        //This is a delta sync
        return DeleteUnusedOverviewEntities(clientAPI).then(()=> {
            errorLibrary.clearError(clientAPI);
            appSettings.remove(clientAPI, 'LocallyIntalledEquip');
            return clientAPI.executeAction('/SAPAssetManager/Actions/OData/ReInitializeOfflineOData.action').then( ()=> {
                return clientAPI.executeAction('/SAPAssetManager/Actions/OData/UploadOfflineData.action').then(() => {
                    const deltaSyncConst = clientAPI.getGlobalDefinition('/SAPAssetManager/Globals/DeltaSync/DeltaSync.global').getValue();
                    const DownloadEffectedEntitiesConst = clientAPI.getGlobalDefinition('/SAPAssetManager/Globals/DeltaSync/DownloadEffectedEntities.global').getValue();
                    let param = libCom.getAppParam(clientAPI, deltaSyncConst, DownloadEffectedEntitiesConst);
                    if (!libVal.evalIsEmpty(param) && param === 'Y') {
                        let definingRequests = [];
                        return ODataLibrary.initializeOnlineService(clientAPI).then(function() {
                            return clientAPI.read('/SAPAssetManager/Services/OnlineAssetManager.service', 'ModifiedEntities', [], '').then(function(ModifiedEntityResults) {
                                if (ModifiedEntityResults && ModifiedEntityResults.length > 0) {
                                    for (let index = 0; index < ModifiedEntityResults.length; index++) {
                                        let entitysetName = ModifiedEntityResults.getItem(index).EntityName;
                                        definingRequests.push({
                                            'Name': entitysetName,
                                            'Query': entitysetName,
                                        });
                                    }
                                    return clientAPI.executeAction({'Name': '/SAPAssetManager/Actions/Documents/DownloadOfflineOData.action', 'Properties': {
                                        'DefiningRequests': definingRequests,
                                    }}).then(()=>{
                                        resetSyncState(clientAPI);
                                    });
                                }
                                resetSyncState(clientAPI);
                                return clientAPI.executeAction('/SAPAssetManager/Actions/SyncSuccessBannerMessage.action');
                            }).catch((error) => {
                                Logger.error(clientAPI.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategorySync.global').getValue(),`SyncData(clientAPI) error: ${error}`);
                                resetSyncState(clientAPI);
                            });
                        }).catch((error) => {
                            Logger.error(clientAPI.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategorySync.global').getValue(),`SyncData(clientAPI) error: ${error}`);
                            resetSyncState(clientAPI);
                        });
                    }
                    return clientAPI.executeAction('/SAPAssetManager/Actions/Documents/DownloadOfflineOData.action').then(()=>{
                        resetSyncState(clientAPI);
                    });
                });
            }).catch((error) => {
                Logger.error(clientAPI.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategorySync.global').getValue(),`SyncData(clientAPI) error: ${error}`);
                resetSyncState(clientAPI);
            });
        });
    } else {
        //This is an initial sync
        return clientAPI.getDefinitionValue('/SAPAssetManager/Rules/OData/Download/DownloadDefiningRequest.js').then(()=>{
            setSyncInProgressState(clientAPI, false);
        });
    }
}

/**
 * Resets the synchronization state by dismissing the "sync in progress" banner message if it is displayed.
 * 
 * @param {object} clientAPI - The client API object providing methods for handling client-side MDK APIs.
 */
function resetSyncState(clientAPI) {
    const message = clientAPI._context?.element?._bannerMessage?._bannerData?.message;
    if (message === clientAPI.localizeText('sync_in_progress')) {
        clientAPI._context.element._bannerMessage.dismiss();
    }
}
