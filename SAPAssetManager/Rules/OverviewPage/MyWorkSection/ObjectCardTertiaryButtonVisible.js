import IsOperationLevelAssigmentType from '../../WorkOrders/Operations/IsOperationLevelAssigmentType';
import libPersona from '../../Persona/PersonaLibrary';
import IsSubOperationLevelAssigmentType from '../../WorkOrders/SubOperations/IsSubOperationLevelAssigmentType';
import CommonLibrary from '../../Common/Library/CommonLibrary';
import IsFSMS4SectionVisible from '../../ServiceOrders/IsFSMS4SectionVisible';

export default function ObjectCardTertiaryButtonVisible(context) {
    let roletype = CommonLibrary.getStateVariable(context, 'UserRoleType');
    let persona = libPersona.getActivePersona(context);
    let overallStatusSeq_Nav;
    if (IsFSMS4SectionVisible(context)) {
        overallStatusSeq_Nav = context.binding.MobileStatus_Nav.OverallStatusCfg_Nav.OverallStatusSeq_Nav;
        let negative = false;
        let secondary = false;
        for (const element of overallStatusSeq_Nav) {
            if (element.RoleType === roletype && element.UserPersona === persona && element.TransitionType === 'S') {
                secondary = true;
            } else if (element.RoleType === roletype && element.UserPersona === persona && element.TransitionType === 'N') {
                negative = true;
            }
        }
        return secondary && negative;
    } else {
        //My Operation Tertiary Button
        if (IsOperationLevelAssigmentType(context)) {
            overallStatusSeq_Nav = context.binding.OperationMobileStatus_Nav.OverallStatusCfg_Nav.OverallStatusSeq_Nav;
        } else if (IsSubOperationLevelAssigmentType(context)) {
        //SubOperation Tertiary Button
            overallStatusSeq_Nav = context.binding.SubOpMobileStatus_Nav.OverallStatusCfg_Nav.OverallStatusSeq_Nav;
        } else {
        //My Work Order Tertiary Button
            overallStatusSeq_Nav = context.binding.OrderMobileStatus_Nav.OverallStatusCfg_Nav.OverallStatusSeq_Nav;
        }
    }
    for (const element of overallStatusSeq_Nav) {
        if (element.RoleType === roletype && element.UserPersona === persona && element.TransitionType === 'T') {
            return true;
        }
    }
    return false;
}
