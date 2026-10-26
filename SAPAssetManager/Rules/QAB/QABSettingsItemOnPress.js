import { QABSettingsPage } from './QABSettings';
import IsWindows from '../Common/IsWindows';
import QABSettingsWindows from './QABSettingsWindows';

export default function QABSettingsItemOnPress(context) {
    return IsWindows(context) ? QABSettingsWindows.itemOnPress(context) : QABSettingsPage.itemOnPress(context);
}
