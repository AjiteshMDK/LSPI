import QABSettingsWindows from "./QABSettingsWindows";
import EnableNotificationCreate from "../UserAuthorizations/Notifications/EnableNotificationCreate";
import IsS4Visible from "../S4RelatedHistories/IsS4Visible";

export default function FSMOverviewAddNotificationIsVisible(context) {
    if (IsS4Visible(context)) {
        return QABSettingsWindows.isButtonVisible(context, 'ADD_NOTIFICATION', IsS4Visible);
    }
    return QABSettingsWindows.isButtonVisible(context, 'ADD_NOTIFICATION', EnableNotificationCreate);
}
