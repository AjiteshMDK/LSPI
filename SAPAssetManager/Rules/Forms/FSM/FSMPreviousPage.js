import CommonLibrary from '../../Common/Library/CommonLibrary';
import FSMFormPageNav from './FSMFormPageNav';
import FSMFormPageNavWindows from './FSMFormPageNavWindows';
import libFormsIOSAnd from './FSMSmartFormsLibrary';
import libFormsWindows from './FSMSmartFormsLibraryWindows';
import IsWindows from '../../Common/IsWindows';

/**
* Decrement the current page counter
* @param {IClientAPI} clientAPI
*/
export default function FSMPreviousPage(clientAPI) {
    let chaptersArray = CommonLibrary.getStateVariable(clientAPI, 'FSMFormInstanceChapters');
    let currentChapterIndex = CommonLibrary.getStateVariable(clientAPI, 'FSMFormInstanceCurrentChapterIndex') || 0;
    let fromNav = IsWindows(clientAPI) ? FSMFormPageNavWindows(clientAPI) : FSMFormPageNav(clientAPI);
    let value;
    let libForms = IsWindows(clientAPI) ?  libFormsWindows : libFormsIOSAnd ;

    if (currentChapterIndex > 0) { //Find the previous visible chapter
        for (let i = currentChapterIndex - 1; i >= 0; i--) {
            if (chaptersArray[i].isVisible) {
                value = i;
                break;
            }
        }
    }
    if (chaptersArray[currentChapterIndex].state === 3) { //Error state = 3
        libForms.ValidateCurrentPageValues(clientAPI, true);
    }
    CommonLibrary.setStateVariable(clientAPI, 'FSMFormInstanceCurrentChapterIndex', value);
    return libForms.saveCurrentPageValues(clientAPI).then(() => {
        return fromNav;
    }); 
}
