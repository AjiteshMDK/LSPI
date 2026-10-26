import EnableNotificationCreateFromWorkOrder from "../UserAuthorizations/Notifications/EnableNotificationCreateFromWorkOrder";
import QABSettingsWindows from "./QABSettingsWindows";

export default function MTQABAddNotificationFromWOIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_NOTIFICATION', EnableNotificationCreateFromWorkOrder);
}
