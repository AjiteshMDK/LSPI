import ToolbarRefresh from '../../Common/DetailsPageToolbar/ToolbarRefresh';
//import ProgressTrackerOnDataChanged from '../../TimelineControl/ProgressTrackerOnDataChanged';
import ServiceOrderDetailsToolbarVisibility from './ServiceOrderDetailsToolbarVisibility';
import QABSettingsWindows from '../../QAB/QABSettingsWindows';

export default async function ServiceOrderDetailsOnPageReturning(context) {
    QABSettingsWindows.refreshQABs(context);
    return ToolbarRefresh(context).then(() => {
        return ServiceOrderDetailsToolbarVisibility(context).then(visibility => {
            context.getToolbar().setVisible(visibility);
            //return ProgressTrackerOnDataChanged(context);
        });
    });
}
