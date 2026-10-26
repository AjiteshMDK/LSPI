import QABSettingsWindows from "./QABSettingsWindows";
import EnableWorkOrderCreate from "../UserAuthorizations/WorkOrders/EnableWorkOrderCreate";
import IsS4Visible from "../S4RelatedHistories/IsS4Visible";

export default function FSMOverviewAddWorkOrderIsVisible(context) {
    if (IsS4Visible(context)) {
        return QABSettingsWindows.isButtonVisible(context, 'ADD_WORK_ORDER', IsS4Visible);
    }
    return QABSettingsWindows.isButtonVisible(context, 'ADD_WORK_ORDER', EnableWorkOrderCreate);
}
