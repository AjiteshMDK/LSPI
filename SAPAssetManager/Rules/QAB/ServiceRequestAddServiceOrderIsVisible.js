import QABSettingsWindows from "./QABSettingsWindows";

export default function ServiceRequestAddServiceOrderIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_SERVICE_ORDER');
}