import IsOperationLevelAssigmentType from '../../WorkOrders/Operations/IsOperationLevelAssigmentType';
import libPersona from '../../Persona/PersonaLibrary';
import CommonLibrary from '../../Common/Library/CommonLibrary';
import IsFSMS4SectionVisible from '../../ServiceOrders/IsFSMS4SectionVisible';
import IsSubOperationLevelAssigmentType from '../../WorkOrders/SubOperations/IsSubOperationLevelAssigmentType';

export default function ObjectCardTertiaryButtonTitle(context) {
    let roletype = CommonLibrary.getStateVariable(context, 'UserRoleType');
    let persona = libPersona.getActivePersona(context);
    let overallStatusSeq_Nav;
    if (IsFSMS4SectionVisible(context)) {
        overallStatusSeq_Nav = context.binding.MobileStatus_Nav.OverallStatusCfg_Nav.OverallStatusSeq_Nav;
        let negative = false;
        let secondary = false;
        let nextOverallStatusCfg_Nav;
        for (const element of overallStatusSeq_Nav) {
            if (element.RoleType === roletype && element.UserPersona === persona && element.TransitionType === 'S') {
                secondary = true;
                nextOverallStatusCfg_Nav = element.NextOverallStatusCfg_Nav;
            } else if (element.RoleType === roletype && element.UserPersona === persona && element.TransitionType === 'N') {
                negative = true;
            }
        }
        if (secondary && negative) {
            let toStatus = nextOverallStatusCfg_Nav.TransitionTextKey ? nextOverallStatusCfg_Nav.TransitionTextKey : nextOverallStatusCfg_Nav.OverallStatusLabel;
            return context.localizeText(toStatus);
        } else {
            return '';
        }
    } else {
        //My Operation Secondary Button
        if (IsOperationLevelAssigmentType(context)) {
            overallStatusSeq_Nav = context.binding.OperationMobileStatus_Nav.OverallStatusCfg_Nav.OverallStatusSeq_Nav;
        } else if (IsSubOperationLevelAssigmentType(context)) {
            overallStatusSeq_Nav = context.binding.SubOpMobileStatus_Nav.OverallStatusCfg_Nav.OverallStatusSeq_Nav;
        } else {
        //My Work Order Secondary Button
            overallStatusSeq_Nav = context.binding.OrderMobileStatus_Nav.OverallStatusCfg_Nav.OverallStatusSeq_Nav;
        }
    }
    for (const element of overallStatusSeq_Nav) {
        if (element.RoleType === roletype && element.UserPersona === persona && element.TransitionType === 'T') {
            let toStatus = element.NextOverallStatusCfg_Nav.TransitionTextKey ? element.NextOverallStatusCfg_Nav.TransitionTextKey : element.NextOverallStatusCfg_Nav.OverallStatusLabel;
            return context.localizeText(toStatus);
        }
    }
    return '';
}
