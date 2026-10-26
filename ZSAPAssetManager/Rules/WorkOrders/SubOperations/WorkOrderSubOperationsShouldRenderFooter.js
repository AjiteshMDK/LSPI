// import WorkOrderSubOperationsCount from './WorkOrderSubOperationsCount';

export default async function SubEquipmentShouldRenderFooter(context) {
    //S4-4669, Sub operation control is not needed
    return false;
    /*const subOperationsCount = await WorkOrderSubOperationsCount(context);

    return subOperationsCount >= 2; */
}
