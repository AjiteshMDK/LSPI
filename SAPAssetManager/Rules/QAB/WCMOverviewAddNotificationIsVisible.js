import QABSettingsWindows from "./QABSettingsWindows";

export default function WCMOverviewAddNotificationIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_NOTIFICATION');
}
