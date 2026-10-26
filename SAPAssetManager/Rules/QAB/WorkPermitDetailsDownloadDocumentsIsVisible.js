import QABSettingsWindows from "./QABSettingsWindows";

export default function WorkPermitDetailsDownloadDocumentsIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'DOWNLOAD_DOCUMENTS');
}
