import libCommon from '../../../Common/Library/CommonLibrary';
import IsWindows from '../../../Common/IsWindows';

export default function NotificationItemCreateNav(context) {
    libCommon.setOnCreateUpdateFlag(context, 'CREATE');
    //Context menu is not yet supported on windows
    if (!IsWindows(context) && context.constructor.getType() === 'SectionedTableProxy') {
        context.getPageProxy().setActionBinding(context.getPageProxy().getExecutedContextMenuItem().getBinding());
    }
    return context.executeAction('/SAPAssetManager/Actions/Notifications/Item/NotificationItemCreateUpdateNav.action');
}
