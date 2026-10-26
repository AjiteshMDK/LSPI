import QABSettingsWindows from "./QABSettingsWindows";
import EnableConfirmationCreate from "../UserAuthorizations/Confirmations/EnableConfirmationCreate";
import IsAddConfirmationButtonVisible from "./IsAddConfirmationButtonVisible";
import IsS4Visible from "../S4RelatedHistories/IsS4Visible";

function isQABRecordConfirmationTime(context) {
    if (IsS4Visible(context)) {
        return false;
    }
    return EnableConfirmationCreate(context) && IsAddConfirmationButtonVisible(context);
}

export default function FSMOverviewRecordTimeIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'RECORD_TIME_CONFIRMATION', isQABRecordConfirmationTime);
}
