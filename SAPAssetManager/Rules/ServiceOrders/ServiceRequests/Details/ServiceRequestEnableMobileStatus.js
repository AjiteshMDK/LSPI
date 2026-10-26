import libMobile from '../../../MobileStatus/MobileStatusLibrary';
import libCommon from '../../../Common/Library/CommonLibrary';

export default function ServiceRequestEnableMobileStatus(context) {
    //We don't allow local mobile status changes if App Parameter MOBILESTATUS - EnableOnLocalBusinessObjects = N
    let isLocal = libCommon.isCurrentReadLinkLocal(context.binding['@odata.readLink']);
    if (isLocal) {
        if (!libCommon.isAppParameterEnabled(context, 'MOBILESTATUS', 'EnableOnLocalBusinessObjects')) {
            return false;
        }
    }

    const COMPLETED = libCommon.getAppParam(context, 'MOBILESTATUS', context.getGlobalDefinition('/SAPAssetManager/Globals/MobileStatus/ParameterNames/CompleteParameterName.global').getValue());
    const mobileStatus = libMobile.getMobileStatus(context.binding, context);
    if ( mobileStatus === COMPLETED) {
        return false;
    }

   return true;
}
