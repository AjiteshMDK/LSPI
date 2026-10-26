import CommonLibrary from "../Common/Library/CommonLibrary";
import NotificationsListGetTypesQueryOption from "../Notifications/ListView/NotificationsListGetTypesQueryOption";

export default async function MTQABNotificationEditIsEnabled(context) {
    let isEditEnabled = CommonLibrary.getAppParam(context, 'USER_AUTHORIZATIONS', 'Enable.NO.Edit') === 'Y';
    if (!isEditEnabled) {
        const filterByType = await NotificationsListGetTypesQueryOption(context);
        const localNotificationsCount = await CommonLibrary.getEntitySetCount(context, 'MyNotificationHeaders', `$filter=sap.islocal()${filterByType ? ' and ' + filterByType : ''}`);
        isEditEnabled = localNotificationsCount > 0;
    }
    return isEditEnabled;
}
