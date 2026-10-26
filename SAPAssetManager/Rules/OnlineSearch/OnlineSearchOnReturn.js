import libCom from '../Common/Library/CommonLibrary';
import SetOnlineSearchActionBarItemVisibility from './Download/SetOnlineSearchActionBarItemVisibility';

export default function OnlineSearchOnReturn(context) {
    //Refresh the selected online search page tab
    if (libCom.getStateVariable(context, 'UpdateOnlineListOnReturn')) {
        let tabControl = context.evaluateTargetPathForAPI('#Page:OnlineSearch')?.getControl('TabsControl');
        if (libCom.isDefined(tabControl)) {
            tabControl._control._tabPages[tabControl.getSelectedTabItemIndex()].redraw();
        }
        libCom.removeStateVariable(context, 'UpdateOnlineListOnReturn');
    }
    SetOnlineSearchActionBarItemVisibility(context);
}
