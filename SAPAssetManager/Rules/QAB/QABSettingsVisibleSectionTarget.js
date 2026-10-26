import { QABSettingsPage } from './QABSettings';
import IsWindows from '../Common/IsWindows';
import CommonLibrary from '../Common/Library/CommonLibrary';

export default function QABSettingsVisibleSectionTarget(context) {
    let selectedItems = context.evaluateTargetPathForAPI('#Page:-Previous').getPageProxy().getControls()[0].getSection('QABButtons')._context.element._props.definition._data.Buttons;
    context.evaluateTargetPathForAPI('#Page:-Previous').getPageProxy().getClientData().selectedItemsMapping = selectedItems.map(item => item._Name);
    return IsWindows(context) ? selectedItems.filter(arrayItem => isEnabled(context, arrayItem)) : QABSettingsPage.getSectionTarget(context, QABSettingsPage.typeVisible);
}

/**
 * Only show the QAB buttons that are enabled from the backend config panel
 * 
 * @param {*} context 
 * @param {*} arrayItem QAB button item
 * @returns 
 */
function isEnabled(context, arrayItem) {
    if (arrayItem._Name =='SETTINGS') {
        return false;
    }
    let btnDict = context.evaluateTargetPathForAPI('#Page:-Previous').getPageProxy().getClientData().QABButtonDictionary;
    if (CommonLibrary.isDefined(btnDict)) {
        if (btnDict.hasOwnProperty(arrayItem._Name) && btnDict[arrayItem._Name].Enabled == false) {
            return false;
        }
    }
    return true;
}
