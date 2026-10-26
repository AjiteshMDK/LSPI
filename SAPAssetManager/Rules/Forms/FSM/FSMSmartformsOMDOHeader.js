import IsS4ServiceIntegrationEnabled from '../../ServiceOrders/IsS4ServiceIntegrationEnabled';
import BackendAppVersionNumber from '../../UserProfile/BackendAppVersionNumber';


export default function FSMSmartformsOMDOHeader(context) {
    let OmdoId = 'XX_FSM_FORM_INSTANCE';
    return BackendAppVersionNumber(context).then(appVersion => {
        if (IsS4ServiceIntegrationEnabled(context)) {
            let S4OmdoId = OmdoId.replace('XX', `SAM${appVersion}`);  
            return S4OmdoId.concat('_S4');            
       } else {
           return OmdoId.replace('XX', `SAM${appVersion}`);
       }
    });
}