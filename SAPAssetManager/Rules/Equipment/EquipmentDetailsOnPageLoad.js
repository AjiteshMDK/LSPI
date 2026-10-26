import { EquipmentLibrary as EquipmentLib } from './EquipmentLibrary';
import QABSettingsWindows from '../QAB/QABSettingsWindows';

/**
 * On Page Load rule for equipment detail screen.
 * @param {*} context 
 */
export default function EquipmentDetailsOnPageLoad(context) {
    QABSettingsWindows.refreshQABs(context);
    return EquipmentLib.equipmentDetailsOnPageLoad(context);
}
