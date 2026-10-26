import QABSettingsWindows from "./QABSettingsWindows";

export default function SafetyCertificateAddOperationItemIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_OPERATIONAL_ITEM');
}
