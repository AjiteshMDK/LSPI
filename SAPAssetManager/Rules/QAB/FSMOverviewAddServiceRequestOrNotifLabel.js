import IsS4Visible from "../S4RelatedHistories/IsS4Visible";

export default function FSMOverviewAddServiceRequestOrNotifLabel(context) {
    return IsS4Visible(context) ? context.localizeText('qab_create_service_request') : context.localizeText('qab_create_service_notification');
}
