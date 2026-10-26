import QABSettingsWindows from "./QABSettingsWindows";

export default function SafetyCertificateAddNotificationIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_NOTIFICATION');
}
