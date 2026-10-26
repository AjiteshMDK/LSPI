/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function InspectionCharacteristicsFDCFilterOperationEntitySet(clientAPI) {
    if (clientAPI && clientAPI.binding && clientAPI.binding.WOHeader_Nav && clientAPI.binding.WOHeader_Nav.Operations) {
        return (clientAPI.binding.WOHeader_Nav.Operations?.length > 0)? clientAPI.binding.WOHeader_Nav.Operations : 'MyWorkOrderOperations';
    } else {
        return 'MyWorkOrderOperations';
    }
}
