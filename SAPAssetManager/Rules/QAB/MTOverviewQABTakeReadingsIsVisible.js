import EquipmentTakeReadingIsVisible from "../Equipment/EquipmentTakeReadingIsVisible";
import UserFeaturesLibrary from "../UserFeatures/UserFeaturesLibrary";
import CommonLibrary from "../Common/Library/CommonLibrary";
import PersonaLibrary from "../Persona/PersonaLibrary";
import QABSettingsWindows from "./QABSettingsWindows";

function isQABTakeReadings(context) {
    const measurementFeatureEnabled = UserFeaturesLibrary.isFeatureEnabled(context, context.getGlobalDefinition('/SAPAssetManager/Globals/Features/PMMeasurement.global').getValue());
    const enableMDCreate = CommonLibrary.getAppParam(context, 'USER_AUTHORIZATIONS', 'Enable.MD.Create') === 'Y' && ((PersonaLibrary.isMaintenanceTechnician(context) || PersonaLibrary.isFieldServiceTechnicianInCSMode(context)));
    
    if (measurementFeatureEnabled && enableMDCreate){
        return EquipmentTakeReadingIsVisible(context);
    }

    return false;
}

export default function MTOverviewQABTakeReadingsIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'TAKE_READINGS', isQABTakeReadings);
}
