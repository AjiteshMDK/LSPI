import MTQABNotificationEditIsEnabled from "./MTQABNotificationEditIsEnabled";
import QABSettingsWindows from "./QABSettingsWindows";

export default function MTOverviewQABAddNotifActivityIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_ACTIVITY', MTQABNotificationEditIsEnabled);
}
