import QABSettingsWindows from "./QABSettingsWindows";
import EnableNotificationCreateFromWorkOrderOperation from "../UserAuthorizations/Notifications/EnableNotificationCreateFromWorkOrderOperation";

export default function MTQABAddNotifFromWoOpIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_NOTIFICATION', EnableNotificationCreateFromWorkOrderOperation);
}
