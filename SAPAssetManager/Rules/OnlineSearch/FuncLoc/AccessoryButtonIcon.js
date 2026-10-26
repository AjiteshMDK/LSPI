import IsAndroid from '../../Common/IsAndroid';
import libSearch from '../OnlineSearchLibrary';
import IsWindows from '../../Common/IsWindows';

/**
* If device is android and entity is available for download, display download icon, otherwise no icon
* @param {IClientAPI} context
*/
export default function AccessoryButtonIcon(context) {
    return (IsAndroid(context) || IsWindows(context)) &&
        !libSearch.isOnlineEntityAvailableOffline(context, 'MyFunctionalLocations', 'FuncLocId') &&
        !libSearch.isCurrentListInSelectionMode(context) ?
        '$(PLT,\'\',/SAPAssetManager/Images/make_available_offline.android.png,\'\',/SAPAssetManager/Images/make_available_offline.android.png)' :
        '';
}
