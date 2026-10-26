import libCom from '../Common/Library/CommonLibrary';
import {DeltaSyncInit} from '../Common/InitializeGlobalStates';
import CreateDefaultOverviewRowEntities from '../Confirmations/Init/CreateDefaultOverviewRowEntities';
import setSyncInProgressState from './SetSyncInProgressState';
import getPendingPushState from '../PushNotifications/GetPushNotificationsPendingState';
import setPendingPushState from '../PushNotifications/SetPushNotificationsPendingState';
import downloadPush from '../PushNotifications/PushNotificationsDownload';
import libCrew from '../Crew/CrewLibrary';
import handleDownloadSuccessForFOW from '../FOW/Sync/HandleDownloadSuccess';
import readUserFeatures from '../UserFeatures/ReadingOfflineUserFeatures';
import userFeaturesLib from '../UserFeatures/UserFeaturesLibrary';
import ApplicationSettings from '../Common/Library/ApplicationSettings';
import callRefreshAfterSync from '../Inventory/Overview/CallRefreshAfterSync';
import FetchAndSaveMetadataDuringSync from '../LCNC/FetchAndSaveMetadataDuringSync';
import Logger from '../Log/Logger';
import RefreshActionBar from '../Common/RefreshActionBar';

export default function CheckForSyncErrorsAfterDownloadSuccess(context) {

    let promises = [];
    // If there are pending Pushes, execute those
    if (getPendingPushState(context)) {
        // If there are pending pushes then we set the "PendingPush" state to false
        // and set the "SyncInProgress" state to true again and download the Push
        setPendingPushState(context, false);
        setSyncInProgressState(context, true);
        downloadPush(context, libCom.getStateVariable(context, 'ObjectType'));
    }

    if (libCrew.isCrewFeatureEnabled(context)) {
        promises.push(libCrew.initializeCrewHeader(context));
    }

    return Promise.all(promises)
        .then(() => {
            return context.count('/SAPAssetManager/Services/AssetManager.service', 'ErrorArchive', '')
                .then(result => {
                    if (result > 0) {
                        return context.executeAction('/SAPAssetManager/Actions/OData/ODataUploadFailureMessage.action').then(() => {
                            setSyncInProgressState(context, false);
                            RefreshActionBar(context);
                            return Promise.reject(false);
                        });
                    } else {
                        return DeltaSyncInit(context).then(() => {
                            return readUserFeatures(context).then(() => {
                                return FetchAndSaveMetadataDuringSync(context).then(() => {
                                    return CreateDefaultOverviewRowEntities(context).then(() => {
                                        let didUserSwitchCompleted = ApplicationSettings.getBoolean(context, 'didUserSwitchDeltaCompleted');
                                        if (didUserSwitchCompleted) { //stop setting the flag to true until user switch delta is completed.
                                            ApplicationSettings.setBoolean(context, 'didSetUserGeneralInfos', true);
                                        }
                                        if (userFeaturesLib.isFeatureEnabled(context, context.getGlobalDefinition('/SAPAssetManager/Globals/Features/FOW.global').getValue())) {
                                            handleDownloadSuccessForFOW(context);
                                        }
                                        setSyncInProgressState(context, false);
                                        if (context.getPageProxy()?._page?._definition?.getName() !== 'CreateUpdatePage') {
                                            context.getPageProxy().redraw();
                                        }
                                        return callRefreshAfterSync(context).then(() => {
                                            return context.executeAction('/SAPAssetManager/Actions/SyncSuccessBannerMessage.action');
                                        });
                                    });
                                });
                            });
                        });
                    }
                });
        }).catch(error => {
            Logger.error(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategorySync.global').getValue(),`CheckForSyncErrorsAfterDownloadSuccess(context) error: ${error}`);
            setSyncInProgressState(context, false);
        });
}
