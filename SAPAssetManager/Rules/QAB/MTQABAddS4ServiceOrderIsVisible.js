import QABSettingsWindows from "./QABSettingsWindows";
import IsS4Visible from "../S4RelatedHistories/IsS4Visible";

export default function MTQABAddS4ServiceOrderIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_SERVICE_ORDER', IsS4Visible);
}
