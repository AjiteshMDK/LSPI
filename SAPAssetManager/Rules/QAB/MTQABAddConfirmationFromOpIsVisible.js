import QABSettingsWindows from "./QABSettingsWindows";
import IsAddConfirmationButtonVisibleOnOperationDetails from "./IsAddConfirmationButtonVisibleOnOperationDetails";

export default function MTQABAddConfirmationFromOpIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_SERVICE_CONFIRMATION', IsAddConfirmationButtonVisibleOnOperationDetails);
}
