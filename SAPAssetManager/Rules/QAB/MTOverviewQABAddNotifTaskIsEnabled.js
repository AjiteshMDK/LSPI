import EnableNotificationCreateEdit from "../UserAuthorizations/Notifications/EnableNotificationCreateEdit";
import EnableNotificationTaskCreate from "../Notifications/Task/CreateUpdate/EnableNotificationTaskCreate";

export default function MTOverviewQABAddNotifTaskIsEnabled(context) {
    return EnableNotificationCreateEdit(context).then(isNotifCreateEdit => {
        if (isNotifCreateEdit) {
            return EnableNotificationTaskCreate(context);
        } else {
            return false;
        }
    });
}
