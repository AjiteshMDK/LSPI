import libCom from "../Common/Library/CommonLibrary";
import libDoc from "../Documents/DocumentLibrary";
import DocumentsIsVisible from "../Documents/DocumentsIsVisible";

export default async function QABIsDocumentDownloadEnabled(context) {
    const documentsIsVisible = DocumentsIsVisible(context);
    const enable = libCom.getAppParam(context, 'USER_AUTHORIZATIONS', 'Enable.MD.Create') === 'Y';
    const noAvailableDocuments = await libDoc.checkIfNoDocumentsAvailableForDownload(context);
    return enable && documentsIsVisible && !noAvailableDocuments
}
