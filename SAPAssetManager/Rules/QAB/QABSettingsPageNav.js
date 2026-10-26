import Logger from '../Log/Logger';
import IsWindows from '../Common/IsWindows';

export default function QABSettingsPageNav(context) {  
    context.getPageProxy().getClientData().selectedItemsToBeSave = context.getPageProxy().getClientData().visibleQABButtons;    
    try {
        return IsWindows(context) ? context.executeAction('/SAPAssetManager/Actions/QAB/QABSettingsPageNav.action') : context.getClientData().QABSettingsInstance.navToSettingsPage();
    } catch (err) {
        Logger.error('QABSettingsPageNav error', err);
    }
}
