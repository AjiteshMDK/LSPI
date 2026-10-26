import libSuper from '../../../../SAPAssetManager/Rules/Supervisor/SupervisorLibrary';
import { OperationLibrary } from '../../WorkOrders/Operations/WorkOrderOperationLibrary';

export default function UserRolesAssignListPickerItems(context) {

    let type = libSuper.getSupervisorAssignmentModel(context);
    let filter = '';
    
    if (type && type === 'O') {
        filter = "$filter=OrgId eq '" + libSuper.getSupervisorOrgId() + "'";
    } else {
        //S4-4669, Multi Operation download from workcenter

        //filter = "$filter=ExternalWorkCenterId eq '" + libSuper.getSupervisorWorkCenter() + "'";
        filter = "$filter=" + OperationLibrary.getzSupervisorOperationsFilterByAssignmentType(context);
    }
    filter += " and PersonnelNo ne '00000000'"; //User does not have an HR employee, so cannot be assigned to
    
    //S4-4669, show unique list
    return context.read('/SAPAssetManager/Services/AssetManager.service', 'UserRoles', ['SAPUserId','UserNameLong','PersonnelNo'], filter + '&$orderby=SAPUserId,UserNameShort').then(result => {
        let json = [];
        result.forEach(function(element) {
            json.push(
                {
                    'DisplayValue': `${element.SAPUserId} - ${element.UserNameLong}`,
                    'ReturnValue': element.PersonnelNo,
                });
        });
        const uniqueSet = new Set(json.map(item => JSON.stringify(item)));
        let finalResult = [...uniqueSet].map(item => JSON.parse(item));
        return finalResult;
    });
}
