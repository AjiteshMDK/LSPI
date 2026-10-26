import libCom from '../../Common/Library/CommonLibrary';
import SetOnlineSearchActionBarItemVisibility from './SetOnlineSearchActionBarItemVisibility';

/**
* Start download of an online entity (equipment/floc)
* Show error toast message, if download is already in progress
* @param {IClientAPI} context
*/
export default function DownloadToDevice(context) {
    if (!libCom.getStateVariable(context, 'OnlineSearchDownloadInProgress')) {
        libCom.setStateVariable(context, 'OnlineSearchDownloadInProgress', true);
        SetOnlineSearchActionBarItemVisibility(context);
        return context.executeAction('/SAPAssetManager/Actions/OnlineSearch/DownloadInProgressBannerMessage.action');
    }
    return context.executeAction('/SAPAssetManager/Actions/OnlineSearch/DownloadInProgressErrorDialog.action');
}
