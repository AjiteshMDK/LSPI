import QABSettingsWindows from "./QABSettingsWindows";
import IsS4Visible from "../S4RelatedHistories/IsS4Visible";

function isFSMQABOnlineSearchIsVisible(context) {
    if (IsS4Visible(context)) {
        return false;
    }
}
export default function FSMOverviewOnlineSearchIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ONLINE_SEARCH', isFSMQABOnlineSearchIsVisible);
}
