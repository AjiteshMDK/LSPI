/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
import isAndroid from '../Common/IsAndroid';
import NativeScriptObject from '../Common/Library/NativeScriptObject';
import IsWindows from '../Common/IsWindows';

export default function OpenSourceLink(clientAPI) {
    let url = '';
    if (isAndroid(clientAPI)) {
        url = clientAPI.getGlobalDefinition('/SAPAssetManager/Globals/OslnAndroid.global').getValue();
    } else if (IsWindows(clientAPI)) {
        url = clientAPI.getGlobalDefinition('/SAPAssetManager/Globals/OslnWindows.global').getValue();
    } else {
        url = clientAPI.getGlobalDefinition('/SAPAssetManager/Globals/OslnIOS.global').getValue();
    }
    return NativeScriptObject.getNativeScriptObject(clientAPI).utilsModule.openUrl(url);
}
