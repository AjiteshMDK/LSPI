/**
 * Determines the duration for displaying the success banner message after synchronization is complete and successful.
 * - Retrieves the configured duration for the sync success banner message from the application parameters in the SAP Config Panel.
 * - Ensures that the returned duration is valid (non-empty, non-negative, and a number).
 * - SAP Config Panel Parameter: Group = DELTA_SYNC, Name = SyncSuccessBannerMsg.Duration
 *
 * @param {object} context - The context object provided by the MDK (Mobile Development Kit) client API, 
 *                           representing the current state of the application and providing access to parameters.
 * @returns {number} The duration in milliseconds for which the success banner should be displayed. Defaults to zero if invalid or no application parameter is found in the SAP Config Panel.
 * 
 */
import CommonLibrary from '../Common/Library/CommonLibrary';
import ValidationLibrary from '../Common/Library/ValidationLibrary';

export default function SyncSuccessBannerMsgDuration(context) {
    const durationStr = CommonLibrary.getAppParam(context, 'DELTA_SYNC', 'SyncSuccessBannerMsg.Duration');
    
    if (ValidationLibrary.evalIsEmpty(durationStr)) {
        return 0;
    }
    
    const durationNum = parseInt(durationStr, 10);
    // Return 0 if parsing fails or the number is negative
    return isNaN(durationNum) || durationNum < 0 ? 0 : durationNum;
}
