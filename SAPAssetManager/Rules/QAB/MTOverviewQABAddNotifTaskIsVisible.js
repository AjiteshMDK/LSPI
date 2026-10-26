import MTQABNotificationEditIsEnabled from "./MTQABNotificationEditIsEnabled";
import QABSettingsWindows from "./QABSettingsWindows";

export default function MTOverviewQABAddNotifTaskIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_TASK', MTQABNotificationEditIsEnabled);
}
