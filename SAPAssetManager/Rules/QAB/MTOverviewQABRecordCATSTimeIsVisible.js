import TimeSheetsIsEnabled from "../TimeSheets/TimeSheetsIsEnabled";
import ConfirmationsIsEnabled from "../Confirmations/ConfirmationsIsEnabled";
import QABSettingsWindows from "./QABSettingsWindows";

function isQABRecordCATSTime(context) {
    return TimeSheetsIsEnabled(context) && !ConfirmationsIsEnabled(context);
}

export default function MTOverviewQABRecordCATSTimeIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'RECORD_TIME', isQABRecordCATSTime);
}
