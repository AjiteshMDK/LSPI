import libCom from '../../Common/Library/CommonLibrary';

/**
 * Sets the visibility of specific action bar items based on the current page and the state of an online search object being downloaded or not.
 *
 * @param {IClientAPI} context - The context object provided by the MDK framework.
 */
export default function SetOnlineSearchActionBarItemVisibility(context) {
    //Hide action bar items if online search download is in progress.
    let isVisible = true;
    if (libCom.getStateVariable(context, 'OnlineSearchDownloadInProgress')) {
        isVisible = false;
    }
    // Determine the current page name and adjust the visibility of the action bar items accordingly.
    const pageName = libCom.getCurrentPageName(context);
    switch (pageName) {
        case "OnlineEquipmentDetailsPage":
        case "OnlineFunctionalLocationDetails":
            // Set the 'Download' action bar item visibility based on the ongoing download status.
            context.getPageProxy().setActionBarItemVisible('Download', isVisible);
            break;
        case "OnlineSearch":
            // Set the 'SearchCriteria' action bar item visibility for the OnlineSearch page.
            context.getPageProxy().setActionBarItemVisible('SearchCriteria', isVisible);
            break;
        case "OnlineSearchEquipmentList":
        case "OnlineSearchFuncLocList":
            // Set the 'SearchCriteria' action bar item visibility for the OnlineSearch page.
            const onlineSearchPage = context.evaluateTargetPathForAPI('#Page:OnlineSearch');
            onlineSearchPage.setActionBarItemVisible('SearchCriteria', isVisible);
            break;
        default:
            break;
    }    
}
