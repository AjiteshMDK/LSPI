import pageToolbar from '../../Common/DetailsPageToolbar/DetailsPageToolbarClass';
import CommonLibrary from '../../Common/Library/CommonLibrary';
import ServiceRequestEnableMobileStatus from '../ServiceRequests/Details/ServiceRequestEnableMobileStatus';

export default function ServiceRequestDetailsToolbarVisibility(context) {
    const toolbarItems = pageToolbar.getInstance().getToolbarItems(context);
    if (CommonLibrary.isDefined(toolbarItems)) {
        return ServiceRequestEnableMobileStatus(context);
    }
    return false;  // Return false if toolbarItems is not defined
}
