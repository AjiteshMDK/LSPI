import EnableOperationCreate from "../UserAuthorizations/WorkOrders/EnableOperationCreate";
import QABSettingsWindows from "./QABSettingsWindows";
import PersonaLibrary from "../Persona/PersonaLibrary";

function isAddOperationIsVisible(context) {
    if (PersonaLibrary.isMaintenanceTechnician(context)) {
        return false;
    }
    return EnableOperationCreate(context);
}

export default function MTQABAddOperationIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'CREATE_OPERATION', isAddOperationIsVisible);
}
