import reminderCount from '../OverviewPage/OverviewPageRemindersCount';
import CommonLibrary from '../Common/Library/CommonLibrary';

export default function RemindersCaption(context) {
    CommonLibrary.redrawActionBar(context);
    return reminderCount(context).then(count => {
        let params=[count];
        return context.setCaption(context.localizeText('reminders_x',params));
    });
}
