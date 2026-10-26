import QABSettingsWindows from "./QABSettingsWindows";

export default function WCMOverviewUntaggingIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'UNTAGGING');
}
