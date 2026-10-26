import EnableNotificationCreate from "../UserAuthorizations/Notifications/EnableNotificationCreate";
import QABSettingsWindows from "./QABSettingsWindows";

export default function MTOverviewQABAddNotificationIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_NOTIFICATION', EnableNotificationCreate);
}
