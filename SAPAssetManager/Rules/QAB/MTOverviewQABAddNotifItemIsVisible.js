import QABSettingsWindows from "./QABSettingsWindows";
import MTQABNotificationEditIsEnabled from "./MTQABNotificationEditIsEnabled";

export default function MTOverviewQABAddNotifItemIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_ITEM', MTQABNotificationEditIsEnabled);
}
