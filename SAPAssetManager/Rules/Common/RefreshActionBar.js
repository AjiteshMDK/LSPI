/**
 * Wrapper function to refresh the action bar in the user interface. Calls a common library utility to redraw the action bar.
 * Use this function to update the action bar when there are changes in the application state that should be visually reflected at the top of the user interface.
 * Typically used after a sync operation starts or completes to provide visual feedback to the user by updating the sync icon and its text.
 * 
 * @param {object} context - The context object provided by the MDK (Mobile Development Kit) client API,
 *                           representing the current state and environment of the user interface.
 */
import CommonLibrary from '../Common/Library/CommonLibrary';

export default function RefreshActionBar(context) {
    CommonLibrary.redrawActionBar(context);
}
