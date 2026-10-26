import ToolbarRefresh from '../../Common/DetailsPageToolbar/ToolbarRefresh';
import NotificationDetailsToolbarVisibility from './NotificationDetailsToolbarVisibility';
import QABSettingsWindows from '../../QAB/QABSettingsWindows';

//Set the enabled status of the toolbar and update buttons
export default function NotificationDetailsOnReturning(context) {
    QABSettingsWindows.refreshQABs(context);
    
    return  ToolbarRefresh(context).then(() => {
        return NotificationDetailsToolbarVisibility(context).then(visibility => {
            context.getToolbar().setVisible(visibility);
        });
    });
}
