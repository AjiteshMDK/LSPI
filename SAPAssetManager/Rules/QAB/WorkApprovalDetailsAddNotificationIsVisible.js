import QABSettingsWindows from "./QABSettingsWindows";

export default function WorkApprovalDetailsAddNotificationIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_NOTIFICATION');
}
