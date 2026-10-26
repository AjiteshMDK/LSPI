import QABSettingsWindows from "./QABSettingsWindows";

export default function ServiceRequestDownloadDocumentIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'DOWNLOAD_DOCUMENTS');
}
