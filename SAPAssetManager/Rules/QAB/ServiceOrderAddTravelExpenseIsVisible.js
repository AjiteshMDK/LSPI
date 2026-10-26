import QABSettingsWindows from "./QABSettingsWindows";
import IsS4Visible from "../S4RelatedHistories/IsS4Visible";

function isServiceOrderAddTavelExpense(context) {
    return !IsS4Visible(context);
}

export default function ServiceOrderAddTavelExpense(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_TRAVEL_EXPENSE', isServiceOrderAddTavelExpense);
}
