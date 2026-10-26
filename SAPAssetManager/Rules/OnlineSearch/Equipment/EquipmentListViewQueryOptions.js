import libCommon from '../../Common/Library/CommonLibrary';
import libSearch from '../OnlineSearchLibrary';

export default function EquipmentListViewQueryOptions(context) {
    const equipmentTabName = context.getGlobalDefinition('/SAPAssetManager/Globals/OnlineSearch/EquipmentTab.global').getValue();
    const queryOptions = libCommon.getQueryOptionFromFilter(context);
    if (libCommon.isDefined(queryOptions)) {
        return libSearch.setTabCaptionWithCountAndEnableSelect(context.getPageProxy(), 'Equipments', queryOptions, equipmentTabName, 'equipment');
    }
    return '';
}
