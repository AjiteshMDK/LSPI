import EnableWorkOrderCreate from "../UserAuthorizations/WorkOrders/EnableWorkOrderCreate";
import QABSettingsWindows from "./QABSettingsWindows";

export default function MTOverviewQABAddWorkOrderIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_WORK_ORDER', EnableWorkOrderCreate);
}
