import libVal from '../../Common/Library/ValidationLibrary';
import { WorkOrderLibrary as libWO } from '../../WorkOrders/WorkOrderLibrary';
import { WorkOrderDetailsPageName } from '../../WorkOrders/Details/WorkOrderDetailsPageToOpen';

export default function WorkOrderPickerItems(context) {
    let filter = '';

    try {
        let partnerFunction = 'VW';
        let clientData = context.evaluateTargetPathForAPI(`#Page:${WorkOrderDetailsPageName(context)}`).getClientData();
        if (!libVal.evalIsEmpty(clientData) && Object.prototype.hasOwnProperty.call(clientData,'IsUnAssign') && clientData.IsUnAssign) {
            filter = `$filter=OrderId eq '${context.binding.OrderId}'`;
        } else if (!libVal.evalIsEmpty(clientData) && Object.prototype.hasOwnProperty.call(clientData,'IsAssign') && clientData.IsAssign) {
            filter = `$filter=WOPartners/all(vw:vw/PartnerFunction ne '${partnerFunction}')&$expand=WOPartners&$orderby=OrderId`;
        } else if (!libVal.evalIsEmpty(clientData) && Object.prototype.hasOwnProperty.call(clientData,'IsReAssign') && clientData.IsReAssign) {
            filter = `$filter=OrderId eq '${context.binding.OrderId}'`;
        }
        filter = `$filter=WOPartners/all(vw:vw/PartnerFunction ne '${partnerFunction}')&$expand=WOPartners&$orderby=OrderId`;
    } catch (error) {
        let partnerType = 'VW';
        filter = `$filter=WOPartners/all(vw:vw/PartnerFunction ne '${partnerType}')&$expand=WOPartners&$orderby=OrderId`;
    }

    return filter
}
