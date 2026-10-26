import QABSettingsWindows from "../QAB/QABSettingsWindows";
import SetOnlineSearchActionBarItemVisibility from "../OnlineSearch/Download/SetOnlineSearchActionBarItemVisibility";

export default function EquipmentDetailsOnPageReturn(clientAPI) {
    SetOnlineSearchActionBarItemVisibility(clientAPI);
    QABSettingsWindows.refreshQABs(clientAPI);
    clientAPI.getPageProxy().getControl('SectionedTable').getSection('SubEquipmentSection').redraw(true);
}
