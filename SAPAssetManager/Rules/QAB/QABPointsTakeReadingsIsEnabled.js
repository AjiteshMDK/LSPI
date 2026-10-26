import MeasuringPointsTakeReadingsIsVisible from "../Measurements/Points/MeasuringPointsTakeReadingsIsVisible";
import UserFeaturesLibrary from "../UserFeatures/UserFeaturesLibrary";
import CommonLibrary from "../Common/Library/CommonLibrary";
import PersonaLibrary from "../Persona/PersonaLibrary";

export default function QABPointsTakeReadingsIsEnabled(context) {
    const measurementFeatureEnabled = UserFeaturesLibrary.isFeatureEnabled(context, context.getGlobalDefinition('/SAPAssetManager/Globals/Features/PMMeasurement.global').getValue());
    const enableMDCreate = CommonLibrary.getAppParam(context, 'USER_AUTHORIZATIONS', 'Enable.MD.Create') === 'Y' && ((PersonaLibrary.isMaintenanceTechnician(context) || PersonaLibrary.isFieldServiceTechnicianInCSMode(context)));
    if (measurementFeatureEnabled && enableMDCreate){
        return MeasuringPointsTakeReadingsIsVisible(context);
    }
    return false;
}
