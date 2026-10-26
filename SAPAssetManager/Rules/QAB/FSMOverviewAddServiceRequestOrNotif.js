import IsS4Visible from "../S4RelatedHistories/IsS4Visible";
export default function FSMOverviewAddServiceRequestOrNotif(context) {
    return IsS4Visible(context) ? context.executeAction('/SAPAssetManager/Rules/ServiceOrders/CreateUpdate/ServiceRequestCreateNav.js') : 
        context.executeAction('/SAPAssetManager/Rules/Notifications/CreateUpdate/NotificationCreateChangeSetNav.js');
}