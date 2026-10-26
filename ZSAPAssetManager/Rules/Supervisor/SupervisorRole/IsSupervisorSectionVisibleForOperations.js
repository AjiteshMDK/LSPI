import libSuper from '../../../../SAPAssetManager/Rules/Supervisor/SupervisorLibrary';
import libMobile from '../../../../SAPAssetManager/Rules/MobileStatus/MobileStatusLibrary';

/**
 * Displays the Supervisor section containing pending Operations for review when the user is in the Supervisor Role.
 * @param {*} context 
 */
export default function IsSupervisorSectionVisibleForOperations(context) {
    //S4-4669, Hide the control in all scenario
    //return false;
    if ((libSuper.isSupervisorFeatureEnabled(context)) && (libMobile.isOperationStatusChangeable(context))) {
        return libSuper.isUserSupervisor(context).then(isSupervisor => {
            if (isSupervisor) {
                return true;
            }
            return false;
        });
    } else {
        return Promise.resolve(false);
    } 
}

