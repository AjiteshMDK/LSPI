import QABSettingsWindows from "./QABSettingsWindows";
import DocumentsIsVisible from "../Documents/DocumentsIsVisible";
import CommonLibrary from "../Common/Library/CommonLibrary";
import DocumentLibrary from "../Documents/DocumentLibrary";

function isQABDownloadDocuments(context) {
    const isDocumentFeatureEnabled = DocumentsIsVisible(context);
    const isDocumentCreateEnabled = CommonLibrary.getAppParam(context, 'USER_AUTHORIZATIONS', 'Enable.MD.Create') === 'Y';
    if (isDocumentFeatureEnabled && isDocumentCreateEnabled) {
        return DocumentLibrary.checkIfNoDocumentsAvailableForDownload(context).then(DocsNotAvailable => {return !DocsNotAvailable});
    }
    return false; 
}

export default function MTQABDownloadDocumentsIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'DOWNLOAD_DOCUMENTS', isQABDownloadDocuments);
}
