import QABSettingsWindows from "./QABSettingsWindows";

export default function WCMOverviewAddReminderIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_REMINDER');
}
