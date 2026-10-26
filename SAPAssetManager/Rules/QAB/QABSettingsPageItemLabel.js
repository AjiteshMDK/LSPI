import IsWindows from "../Common/IsWindows"
export default async function QABSettingsPageItemLabel(context) {
    return IsWindows(context) ? await context.getDefinitionValue(context.binding.Title) : context.binding.Label;
}