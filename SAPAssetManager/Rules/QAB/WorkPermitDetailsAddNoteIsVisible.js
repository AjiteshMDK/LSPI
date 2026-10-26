import QABSettingsWindows from "./QABSettingsWindows";

export default function WorkPermitDetailsAddNoteIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_WCM_NOTE');
}
