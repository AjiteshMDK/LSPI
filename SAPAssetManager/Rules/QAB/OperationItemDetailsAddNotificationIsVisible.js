import QABSettingsWindows from "./QABSettingsWindows";

export default function OperationItemDetailsAddNotificationIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_NOTIFICATION');
}
