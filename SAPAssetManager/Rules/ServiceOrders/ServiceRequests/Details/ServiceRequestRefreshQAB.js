import QABSettingsWindows from "../../../QAB/QABSettingsWindows";

export default async function ServiceRequestRefreshQAB(context) {
    QABSettingsWindows.refreshQABs(context);
}

