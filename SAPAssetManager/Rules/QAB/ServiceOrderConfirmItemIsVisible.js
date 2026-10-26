import QABSettingsWindows from "./QABSettingsWindows";

export default function ServiceOrderConfirmItemIsVisble(context) {
    return QABSettingsWindows.isButtonVisible(context, 'CONFIRM_ITEM');
}
