import TimeSheetsIsEnabled from "../TimeSheets/TimeSheetsIsEnabled";
import EnableConfirmationCreate from "../UserAuthorizations/Confirmations/EnableConfirmationCreate";
import ConfirmationsIsEnabled from "../Confirmations/ConfirmationsIsEnabled";
import QABSettingsWindows from "./QABSettingsWindows";

function isRecordConfirmationTime(context) {
    return EnableConfirmationCreate(context) && ConfirmationsIsEnabled(context) && !TimeSheetsIsEnabled(context);
}

export default function MTOverviewQABRecordConfirmationTimeIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'RECORD_TIME_CONFIRMATION', isRecordConfirmationTime);
}
