import QABSettingsWindows from "./QABSettingsWindows";

export default function WCMOverviewTaggingIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'TAGGING');
}
