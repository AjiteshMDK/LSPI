import { EquipmentLibrary as libEquipment } from './EquipmentLibrary';
import userFeaturesLib from '../UserFeatures/UserFeaturesLibrary';
import libVal from '../Common/Library/ValidationLibrary';
import libCom from '../Common/Library/CommonLibrary';

export default function EquipmentDetailsNav(context) {
    let pageProxy = context.getPageProxy();
    let actionContext = pageProxy.getActionBinding();
    if (libVal.evalIsEmpty(actionContext)) {
        actionContext = pageProxy.binding;
    }

    let queryOpts = libEquipment.equipmentDetailsQueryOptions();
    if (userFeaturesLib.isFeatureEnabled(context,context.getGlobalDefinition('/SAPAssetManager/Globals/Features/AssetCentral.global').getValue())) {
        queryOpts = libEquipment.equipmentDetailsWithAssetCentralQueryOptions();
    }

    let readLink = actionContext['@odata.readLink'];
    if (actionContext['@odata.type'] === '#sap_mobile.S4ServiceOrderRefObj') {
        if (!actionContext.Equipment_Nav) return Promise.resolve();
        readLink = actionContext.Equipment_Nav['@odata.readLink'];
    }
    if (actionContext['@odata.type'] === '#sap_mobile.S4ServiceRequestRefObj') {
        if (!actionContext.MyEquipment_Nav) return Promise.resolve();
        readLink = actionContext.MyEquipment_Nav['@odata.readLink'];
    }
    if (actionContext['@odata.type'] === '#sap_mobile.Equipment') {
        readLink = `My${readLink}`;
    }

    return libCom.navigateOnRead(context,'/SAPAssetManager/Actions/Equipment/EquipmentDetailsNav.action', readLink, queryOpts);
}
