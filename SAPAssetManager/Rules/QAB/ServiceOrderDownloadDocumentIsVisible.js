import QABSettingsWindows from "./QABSettingsWindows";
import CommonLibrary from "../Common/Library/CommonLibrary";

function isServiceOrderDownloadDocumentQABVisible(context){
    return CommonLibrary.getAppParam(context, 'USER_AUTHORIZATIONS', 'Enable.MD.Create') === 'Y';
}

export default function ServiceOrderDownloadDocumentIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'DOWNLOAD_DOCUMENTS', isServiceOrderDownloadDocumentQABVisible);
}
