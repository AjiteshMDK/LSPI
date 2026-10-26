import { QABSettingsPage } from './QABSettings';
import QABSettingsWindows from './QABSettingsWindows';
import IsWindows from '../Common/IsWindows';

export default function QABSettingsOnSaveOnPress(context) {
    return IsWindows(context) ? QABSettingsWindows.onSaveOnPress(context) : QABSettingsPage.onSaveOnPress(context);
}
