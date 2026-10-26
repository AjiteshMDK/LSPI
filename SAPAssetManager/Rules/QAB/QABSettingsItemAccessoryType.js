import { QABSettingsPage } from './QABSettings';
import QABSettingsWindows from './QABSettingsWindows';
import IsWindows from '../Common/IsWindows';

export default function QABSettingsItemAccessoryType(context) {
    return IsWindows(context) ? QABSettingsWindows.getItemAccessoryType(context) : QABSettingsPage.getItemAccessoryType(context);
}
