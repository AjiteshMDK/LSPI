import WOMobileLib from './MobileStatus/WorkOrderMobileStatusLibrary';
import FollowOnWorkOrderListViewCaption from './FollowOnWorkOrderListViewCaption';
import CommonLibrary from '../Common/Library/CommonLibrary';

export default function FollowOnWorkOrderListViewOnReturning(context) {
    let sectionedTableProxy = context.getControls()[0];
    sectionedTableProxy.redraw();
    CommonLibrary.redrawActionBar(context);
    return WOMobileLib.isAnyWorkOrderStarted(context).then(() => {
        return FollowOnWorkOrderListViewCaption(context).then(caption => {
            return context.setCaption(caption);
        });
    });
}
