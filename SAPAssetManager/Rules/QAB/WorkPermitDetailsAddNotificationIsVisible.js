import QABSettingsWindows from "./QABSettingsWindows";

export default function WorkPermitDetailsAddNotificationIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_NOTIFICATION');
}
