import OnDateChanged from '../Common/OnDateChanged';
import QABSettingsWindows from "../QAB/QABSettingsWindows";

export default function OverviewOnPageLoad(context) {
    // First time the page has loaded, call OnDateChanged
    OnDateChanged(context);
    QABSettingsWindows.refreshQABs(context);
}
