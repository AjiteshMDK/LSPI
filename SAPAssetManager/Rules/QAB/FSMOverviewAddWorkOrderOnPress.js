import IsS4Visible from "../S4RelatedHistories/IsS4Visible";
export default function GetAddOrderButtonTitle(context) {
    return IsS4Visible(context) ? context.executeAction('/SAPAssetManager/Rules/ServiceOrders/CreateUpdate/ServiceOrderCreateNav.js') : context.executeAction('/SAPAssetManager/Rules/WorkOrders/CreateUpdate/WorkOrderCreateNav.js');
}