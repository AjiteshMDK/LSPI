import { QABSettingsPage } from './QABSettings';
import IsWindows from '../Common/IsWindows';

export default function QABSettingsPageOnLoaded(context) {
    if (!IsWindows(context)){
        QABSettingsPage.pageOnLoaded(context);
    }
}
