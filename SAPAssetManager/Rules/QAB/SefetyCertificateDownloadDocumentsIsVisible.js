import QABSettingsWindows from "./QABSettingsWindows";

export default function SafetyCertificateDownloadDocumentIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'DOWNLOAD_DOCUMENTS');
}
