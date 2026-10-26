import libCom from '../../Common/Library/CommonLibrary';
import { cacheEntitySetsForOnlineSearchPage } from '../ExecuteNavToOnlineSearchPage';

/**
* Update list on download success
* @param {IClientAPI} context
*/
export default function DownloadSuccess(context) {
    libCom.removeStateVariable(context, 'OnlineSearchDownloadInProgress');
    libCom.setStateVariable(context, 'UpdateOnlineListOnReturn', true);
    
    const onlineSearchPage = context.evaluateTargetPathForAPI('#Page:OnlineSearch');
    libCom.clearFromClientData(context, ['MyEquipments', 'MyFunctionalLocations'], onlineSearchPage.getClientData());
    return cacheEntitySetsForOnlineSearchPage(context).then(() => {
        return true;
    });
}
