import EnableWorkOrderCreateFromWorkOrder from "../UserAuthorizations/WorkOrders/EnableWorkOrderCreateFromWorkOrder";
import QABSettingsWindows from "./QABSettingsWindows";
import PersonaLibrary from "../Persona/PersonaLibrary";

function isFollowUpWorkOrderIsVisible(context) {
    if (PersonaLibrary.isMaintenanceTechnician(context)) {
        return EnableWorkOrderCreateFromWorkOrder(context);
    }
    return false;
}

export default function MTQABAddFollowUpWorkOrderIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_WORK_ORDER', isFollowUpWorkOrderIsVisible);
}
