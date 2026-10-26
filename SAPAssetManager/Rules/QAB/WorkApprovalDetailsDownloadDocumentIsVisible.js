import QABSettingsWindows from "./QABSettingsWindows";

export default function WorkApprovalDetailsDownloadDocumentsIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'DOWNLOAD_DOCUMENTS');
}
