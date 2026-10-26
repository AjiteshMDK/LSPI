/**
 * Determines the appropriate icon for the sync status based on the application's current state.
 * If auto-sync is in progress, it returns an auto-sync icon.
 * If a manual sync is in progress, it returns a sync-in-progress icon.
 * If no sync is in progress, it returns a default sync icon.
 * 
 * @param {object} context - The context object provided by the MDK (Mobile Development Kit) client API.
 * @returns {string} Returns a platform-specific icon that visually represents the synchronization state of the application.
 */
import IsAutoSyncInProgress from './IsAutoSyncInProgress';
import IsSyncInProgress from './IsSyncInProgress';

export default function SyncIcon(context) {
    if (IsAutoSyncInProgress(context)) {
        return '$(PLT, /SAPAssetManager/Images/auto-sync.pdf, /SAPAssetManager/Images/auto-sync.android.png, null, /SAPAssetManager/Images/auto-sync.windows.png)';
    } else if (IsSyncInProgress(context)) {
        return '$(PLT, /SAPAssetManager/Images/auto-sync.pdf, /SAPAssetManager/Images/auto-sync.android.png, null, /SAPAssetManager/Images/sync-in-progress.windows.png)';
    }
    return '$(PLT, /SAPAssetManager/Images/sync.pdf, /SAPAssetManager/Images/sync.android.png, null, /SAPAssetManager/Images/sync.png)';
}
