import QABSettingsWindows from "./QABSettingsWindows";

export default function WorkPermitDetailsDownloadDocumentsIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ISSUE_APPROVALS');
}
