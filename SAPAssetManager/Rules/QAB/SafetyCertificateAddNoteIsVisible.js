import QABSettingsWindows from "./QABSettingsWindows";

export default function SafetyCertificateAddNoteIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_WCM_NOTE');
}
