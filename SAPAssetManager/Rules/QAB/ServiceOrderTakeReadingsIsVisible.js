import QABSettingsWindows from "./QABSettingsWindows";
import UserFeaturesLibrary from "../UserFeatures/UserFeaturesLibrary";

function isServiceOrderTakeReadingsQABVisible (context) {
    return UserFeaturesLibrary.isFeatureEnabled(context, context.getGlobalDefinition('/SAPAssetManager/Globals/Features/PMMeasurement.global').getValue());
}

export default function ServiceOrderTakeReadingsIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'TAKE_READINGS', isServiceOrderTakeReadingsQABVisible);
}
