
import BulkGoodsIssueIsAllowed from '../IssueOrReceipt/BulkUpdate/BulkGoodsIssueIsAllowed';
import BulkGoodsReceiptIsAllowed from '../IssueOrReceipt/BulkUpdate/BulkGoodsReceiptIsAllowed';
import PhysicalInventoryCountAllIsAllowed from '../PhysicalInventory/PhysicalInventoryCountAllIsAllowed';
import isWindows from '../../Common/IsWindows';

const ACCESSORY_BUTTON_ICON = "$(PLT, /SAPAssetManager/Images/edit-accessory.ios.png, /SAPAssetManager/Images/edit-accessory.android.png, '',  /SAPAssetManager/Images/edit-accessory.windows.png)";

export default function GetAccessoryButtonIcon(context) {
    const binding = context.binding;
    if (binding?.PhysicalInventoryDocHeader_Nav) {
        return GetAccessoryButtonIconPhysicalInventory(context);
    } else if (binding?.InboundDelivery_Nav) {
        return GetAccessoryButtonIconInboundDelivery(binding);
    } else if (binding?.OutboundDelivery_Nav) {
        return GetAccessoryButtonIconOutboundDelivery(binding);
    } else if (binding?.ReservationHeader_Nav) {
        return isWindows(context)? '' : GetAccessoryButtonIconReservation(context, binding);
    } else if (binding?.PurchaseOrderHeader_Nav) {
        return isWindows(context)? '' : GetAccessoryButtonIconPurchaseOrder(context, binding);
    } else if (binding?.StockTransportOrderHeader_Nav) {
        return isWindows(context)? '' : GetAccessoryButtonIconStockTransportOrder(context, binding);
    } else if (binding?.ProductionOrderHeader_Nav) {
        return  isWindows(context)? '' : GetAccessoryButtonIconProductionOrder(context, binding);
    }
    return ACCESSORY_BUTTON_ICON;
}

function GetAccessoryButtonIconPhysicalInventory(context) {
    return PhysicalInventoryCountAllIsAllowed(context).then((allowed) => allowed ? ACCESSORY_BUTTON_ICON : '');
}

function GetAccessoryButtonIconPurchaseOrder(context, binding) {
    return BulkGoodsReceiptIsAllowed(context, binding.PurchaseOrderHeader_Nav).then((allowed) => allowed ? ACCESSORY_BUTTON_ICON : '');
}

function GetAccessoryButtonIconStockTransportOrder(context, binding) {
    return BulkGoodsIssueIsAllowed(context, binding.StockTransportOrderHeader_Nav).then((allowed) => allowed ? ACCESSORY_BUTTON_ICON : '');
}   

function GetAccessoryButtonIconProductionOrder(context, binding) { 
    return BulkGoodsIssueIsAllowed(context, binding.ProductionOrderHeader_Nav).then((allowed) => allowed ? ACCESSORY_BUTTON_ICON : '');
}

function GetAccessoryButtonIconInboundDelivery(binding) {        
    return binding.InboundDelivery_Nav.GoodsMvtStatus !== 'C' ? ACCESSORY_BUTTON_ICON : '';
}

function GetAccessoryButtonIconOutboundDelivery(binding) {       
    return binding.OutboundDelivery_Nav.GoodsMvtStatus !== 'C' ? ACCESSORY_BUTTON_ICON : '';
}   

function GetAccessoryButtonIconReservation(context, binding) {         
    return BulkGoodsIssueIsAllowed(context, binding.ReservationHeader_Nav).then((allowed) => allowed ? ACCESSORY_BUTTON_ICON : '');
}
