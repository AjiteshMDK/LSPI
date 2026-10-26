import QABSettingsWindows from "./QABSettingsWindows";
import CommonLibrary from "../Common/Library/CommonLibrary";

function isQABDownloadDocumentsVisible(context) {  
    return CommonLibrary.getAppParam(context, 'USER_AUTHORIZATIONS', 'Enable.MD.Create') === 'Y';
}

export default function QABDownloadDocumentsIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'DOWNLOAD_DOCUMENTS', isQABDownloadDocumentsVisible);
}
