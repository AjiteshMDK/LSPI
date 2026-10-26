import QABSettingsWindows from "./QABSettingsWindows";

export default function MTOverviewQABHierarchyIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'HIERARCHY');
}
