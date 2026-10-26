import QABSettingsWindows from '../../QAB/QABSettingsWindows';
import CommonLibrary from '../../Common/Library/CommonLibrary';

export default function WCMOverviewQABRefresh(context) {
   CommonLibrary.redrawActionBar(context);
   QABSettingsWindows.refreshQABs(context);
}
