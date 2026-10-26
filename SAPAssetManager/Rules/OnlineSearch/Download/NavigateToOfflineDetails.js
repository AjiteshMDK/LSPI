import EquipmentDetailsNav from '../../Equipment/EquipmentDetailsNav';
import { navigateOnRead } from '../../FunctionalLocation/FunctionalLocationDetailsNav';
import libCom from '../../Common/Library/CommonLibrary';

export default function NavigateToOfflineDetails(context) {
    const pageName = libCom.getCurrentPageName(context);
    if (pageName === 'OnlineEquipmentDetailsPage' || pageName === 'OnlineFunctionalLocationDetails') {
        const id = context.showActivityIndicator();
        try{
            return context.executeAction('/SAPAssetManager/Actions/Page/ClosePage.action').then(() => {
                if (context.binding['@odata.type'] === '#sap_mobile.Equipment') {
                    return EquipmentDetailsNav(context);
                }
                return navigateOnRead(context, `MyFunctionalLocations('${context.binding.FuncLocIdIntern}')`);
           });
        } finally {
            context.dismissActivityIndicator(id);
        }
    }   
}
