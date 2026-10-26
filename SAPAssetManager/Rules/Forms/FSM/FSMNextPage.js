import CommonLibrary from '../../Common/Library/CommonLibrary';
import FSMFormPageNav from './FSMFormPageNav';
import FSMFormPageNavWindows from './FSMFormPageNavWindows';
import libFormsIOSAnd from './FSMSmartFormsLibrary';
import libFormsWindows from './FSMSmartFormsLibraryWindows';
import IsWindows from '../../Common/IsWindows';

/**
* Increment the current page counter
* @param {IClientAPI} clientAPI
*/
export default function FSMNextPage(clientAPI) {
    let chaptersArray = CommonLibrary.getStateVariable(clientAPI, 'FSMFormInstanceChapters');
    let currentChapterIndex = CommonLibrary.getStateVariable(clientAPI, 'FSMFormInstanceCurrentChapterIndex') || 0;
    let fromNav = IsWindows(clientAPI) ? FSMFormPageNavWindows(clientAPI) : FSMFormPageNav(clientAPI);
    let value;
    let passedValidation;
    let libForms = IsWindows(clientAPI) ?  libFormsWindows : libFormsIOSAnd ;

    if (currentChapterIndex < chaptersArray.length) { //Find the next visible chapter
        for (let i = currentChapterIndex + 1; i < chaptersArray.length; i++) {
            if (chaptersArray[i].isVisible) {
                value = i;
                break;
            }
        }
    }
    passedValidation = libForms.ValidateCurrentPageValues(clientAPI);
    if (passedValidation) {
        CommonLibrary.setStateVariable(clientAPI, 'FSMFormInstanceCurrentChapterIndex', value);
        return libForms.saveCurrentPageValues(clientAPI).then(() => {
            return fromNav;
        });
    } else {
        clientAPI.executeAction('/SAPAssetManager/Actions/Forms/FSM/FormValidationErrorBanner.action');
    }
}
