import NotificationDetailsDidHideActionItems from './NotificationDetailsDidHideActionItems';
import QABSettingsWindows from '../../QAB/QABSettingsWindows';

// Hide the action bar based on status of the Notification and send the flag indicating if the items are visible or not
export default function NotificationDetailsOnPageLoad(context) {
    QABSettingsWindows.refreshQABs(context);
    return NotificationDetailsDidHideActionItems(context);
}
