import QABSettingsWindows from "./QABSettingsWindows";
import IsS4Visible from "../S4RelatedHistories/IsS4Visible";

export default function FSMOverviewAddServiceConfirmationIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_SERVICE_CONFIRMATION', IsS4Visible);
}
