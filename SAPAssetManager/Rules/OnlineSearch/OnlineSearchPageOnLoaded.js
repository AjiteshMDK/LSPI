import libCom from '../Common/Library/CommonLibrary';
import SetOnlineSearchActionBarItemVisibility from './Download/SetOnlineSearchActionBarItemVisibility';

/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function OnlineSearchPageOnLoaded(context) {
    SetOnlineSearchActionBarItemVisibility(context);
    let clientData = context.evaluateTargetPathForAPI('#Page:OnlineSearch').getClientData();
    let tabName = clientData?.preselectedTab;
    //if preselected value is equipments tab, do not change tab manually as it is a default one anyway
    if (libCom.isDefined(tabName) && tabName !== context.getGlobalDefinition('/SAPAssetManager/Globals/OnlineSearch/EquipmentTab.global').getValue()) {
        context.evaluateTargetPathForAPI('#Page:OnlineSearch').getControls()[0].setSelectedTabItemByName(tabName);
    }
}
