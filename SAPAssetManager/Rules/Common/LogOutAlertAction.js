/**
* Show Log out action prompot and log out the user
* @param {IClientAPI} context
*/
import Logger from '../Log/Logger';
import CompleteReset from './CompleteReset';
import isWindows from '../Common/IsWindows';
import libCrew from '../Crew/CrewLibrary';

export default function LogOutAlertAction(clientAPI) {
    const title = clientAPI.localizeText('logout_user_prompt_title');
    const message = clientAPI.localizeText('logout_user_promp_message');
    const continue_text = clientAPI.localizeText('continue_text');
    const continue_without_sync_text = clientAPI.localizeText('continue_without_sync');
    const cancelText = clientAPI.localizeText('cancel');

    if (isWindows(clientAPI)){
        return clientAPI.executeAction(
            {
                'Name': '/SAPAssetManager/Actions/Common/GenericWarningDialog.action',
                'Properties': {
                    'Title': title,
                    'Message': message,
                    'OKCaption': continue_text,
                    'CancelCaption': continue_without_sync_text
                },
            }
        ).then(successResult => {
            if (successResult.data === true) {
                return clientAPI.executeAction('/SAPAssetManager/Actions/UploadOnlyProgressBannerMessage.action').then(() => {
                    return clientAPI.count('/SAPAssetManager/Services/AssetManager.service', 'ErrorArchive', '').then(errorCount => {
                        if (errorCount > 0) {
                            return clientAPI.executeAction({
                                'Name': '/SAPAssetManager/Actions/Common/GenericErrorDialog.action',
                                'Properties': {
                                    'Title': clientAPI.localizeText('transactional_errors'),
                                    'Message': clientAPI.localizeText('transactional_errors_message'),
                                    'OKCaption': clientAPI.localizeText('ok'),
                                },
                            });
                        } else {
                            return CompleteReset(clientAPI, false)
                                .then(() => clientAPI.executeAction('/SAPAssetManager/Actions/LogOut/LoggingOutBannerMessage.action')).catch((error) => {
                                    Logger.error('Logging Out Banner Message Failure', error);
                                });
                        }
                    });
                }).catch((error) => {
                    Logger.error('UploadFailure', error);
                    return CompleteReset(clientAPI, false)
                        .then(() => clientAPI.executeAction('/SAPAssetManager/Actions/User/LogOutUser.action'));
                });
            } else  { // User choose to do logout without sync
                if(libCrew.isCrewFeatureEnabled(clientAPI)){
                    return removeCrew(clientAPI).then(() => {
                        return CompleteReset(clientAPI, false)
                        .then(() => clientAPI.executeAction('/SAPAssetManager/Actions/User/LogOutBannerMessage.action'));
                    });
                } else {
                    return CompleteReset(clientAPI, false)
                    .then(() => clientAPI.executeAction('/SAPAssetManager/Actions/User/LogOutUser.action'));
                }
            }
        });
    }

    return clientAPI.nativescript.uiDialogsModule.confirm({
        title: title,
        message: message,
        okButtonText: continue_text,
        cancelButtonText: continue_without_sync_text,
        neutralButtonText: cancelText,
    }).then(result => {
        if (result) { // User choose to do sync before logout
            return clientAPI.executeAction('/SAPAssetManager/Actions/UploadOnlyProgressBannerMessage.action').then(() => {
                return clientAPI.count('/SAPAssetManager/Services/AssetManager.service', 'ErrorArchive', '').then(errorCount => {
                    if (errorCount > 0) {
                        return clientAPI.executeAction({
                            'Name': '/SAPAssetManager/Actions/Common/GenericErrorDialog.action',
                            'Properties': {
                                'Title': clientAPI.localizeText('transactional_errors'),
                                'Message': clientAPI.localizeText('transactional_errors_message'),
                                'OKCaption': clientAPI.localizeText('ok'),
                            },
                        });
                    } else {
                        return CompleteReset(clientAPI, false)
                            .then(() => clientAPI.executeAction('/SAPAssetManager/Actions/LogOut/LoggingOutBannerMessage.action')).catch((error) => {
                                Logger.error('Logging Out Banner Message Failure', error);
                            });
                    }
                });
            }).catch((error) => {
                Logger.error('UploadFailure', error);
                return CompleteReset(clientAPI, false)
                    .then(() => clientAPI.executeAction('/SAPAssetManager/Actions/User/LogOutUser.action'));
            });
        } else if (result === false) { // User choose to do logout without sync
            return CompleteReset(clientAPI, false)
                .then(() => clientAPI.executeAction('/SAPAssetManager/Actions/User/LogOutBannerMessage.action'));
        }
        return undefined;
    });
}

function removeCrew(context){
    try {
        return context.read('/SAPAssetManager/Services/AssetManager.service','CrewLists',[],"$filter=sap.islocal()").then(result => {
            if (result && result.length > 0) {  
                return context.executeAction({
                    'Name': '/SAPAssetManager/Actions/Common/GenericDelete.action',
                    'Properties': {
                        'Target': {
                            'EntitySet': 'CrewLists',
                            'ReadLink': result.getItem(0)['@odata.readLink'],
                            'Service': '/SAPAssetManager/Services/AssetManager.service',
                        },
                    },
                }); 
            }
        });
    } catch (err) {
        return Promise.resolve();
    }
}