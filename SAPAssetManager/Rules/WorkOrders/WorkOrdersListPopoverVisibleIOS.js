import WorkOrdersListPopoverVisible from './WorkOrdersListPopoverVisible';
import IsIOS from '../Common/IsIOS';

export default function WorkOrdersListPopoverVisibleIOS(context) {
    if (IsIOS(context)) {
        return WorkOrdersListPopoverVisible(context).then(result => {
            return result;
        });
    }
    return false;
}
