import QABSettingsWindows from "./QABSettingsWindows";

export default function WorkApprovalDetailsAddNoteIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_WCM_NOTE');
}
