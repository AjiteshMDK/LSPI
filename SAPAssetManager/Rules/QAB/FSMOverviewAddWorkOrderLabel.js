import IsS4Visible from "../S4RelatedHistories/IsS4Visible";
import PersonaLibrary from "../Persona/PersonaLibrary";

export default function FSMOverviewAddWorkOrderLabel(context) {
    if (PersonaLibrary.isMaintenanceTechnician(context) || PersonaLibrary.isMaintenanceTechnicianStd(context)) {
        return context.localizeText('create_workorder');
    }
    let title = IsS4Visible(context) ? context.localizeText('add_service_order') : context.localizeText('add_workorder');
    return title;
}
