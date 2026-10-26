/**
 * Returns the localized caption text for the sync icon to reflect whether synchronization is in progress or idle.
 *  If synchronization is in progress, including auto sync, it returns the localized string for "syncing."
 * If no synchronization is in progress, it returns the localized string for "sync."
 * 
 * @param {object} context - The context object provided by the MDK (Mobile Development Kit) client API,
 *                           representing the current state of the application and localization utilities.
 * @returns {string} A localized string for the sync icon caption, either "syncing" or "sync."
 * 
 */
import IsSyncInProgress from './IsSyncInProgress';

export default function SyncIconCaption(context) {
    if (IsSyncInProgress(context)) {
        return context.localizeText('settings_profile_syncing');
    }
    return context.localizeText('sync');
}
