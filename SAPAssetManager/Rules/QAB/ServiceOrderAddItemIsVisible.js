import QABSettingsWindows from "./QABSettingsWindows";

export default function ServiceOrderAddItemIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ADD_ITEM');
}
