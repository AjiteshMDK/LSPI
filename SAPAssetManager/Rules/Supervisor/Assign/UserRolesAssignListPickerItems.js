import libSuper from '../SupervisorLibrary';

export default function UserRolesAssignListPickerItems(context) {

    let type = libSuper.getSupervisorAssignmentModel(context);
    let filter = '';
    
    if (type && type === 'O') {
        filter = "$filter=OrgId eq '" + libSuper.getSupervisorOrgId() + "'";
    } else {
        filter = "$filter=ExternalWorkCenterId eq '" + libSuper.getSupervisorWorkCenter() + "'";
    }
    filter += " and PersonnelNo ne '00000000'"; //User does not have an HR employee, so cannot be assigned to
    return filter;
}
