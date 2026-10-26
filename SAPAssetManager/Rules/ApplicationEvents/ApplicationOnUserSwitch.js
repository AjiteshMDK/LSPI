
import ApplicationSettings from '../Common/Library/ApplicationSettings';
import InitializeOnUserSwitch from './InitializeOnUserSwitch';
import IsESRINameUserAuthEnabled from '../ESRI/IsESRINameUserAuthEnabled';
import EsriLibrary from '../ESRI/EsriLibrary';
import IsWindows from '../Common/IsWindows';
import libPersona from '../Persona/PersonaLibrary';
import CheckForSyncErrorsAfterDownloadSuccess from '../Sync/CheckForSyncErrorsAfterDownloadSuccess';
import InitializeGlobalStates from '../Common/InitializeGlobalStates.js'
import LoadPersonaOverview from '../Persona/LoadPersonaOverview';

/**
* Function that executes when reset action is being called with Skip Reset set to true
* @param {IClientAPI} context
*/
export default async function ApplicationOnUserSwitch(context) {
    context.executeAction('/SAPAssetManager/Actions/Persona/LandingPage.action');
    let provider = context.getODataProvider('/SAPAssetManager/Services/AssetManager.service');
    let storeParameters = provider.getOfflineParameters();
    let headers = storeParameters.getCustomHeaders();
    if (headers) {
        headers.UserSwitch = true;
    } else {
        headers = {'UserSwitch':true};
    }
    storeParameters.setCustomHeaders(headers);
    ApplicationSettings.setBoolean(context,'didUserSwitchDeltaCompleted', false);
    context.showActivityIndicator(context.localizeText('download_progress'));
    if (IsESRINameUserAuthEnabled(context) && !IsWindows(context)) {
        await EsriLibrary.openEsriUserLoginPage(context);
    }
    return InitializeOnUserSwitch(context).then(() => {
        return LoadPersonaOverview(context).then(() => {
            return InitializeGlobalStates(context).then(() => {
                return CheckForSyncErrorsAfterDownloadSuccess(context).then(() => {
                    let overviewPageName = libPersona.getPersonaOverviewStateVariablePage(context);
                    const overviewPage = context.evaluateTargetPathForAPI('#Page:' + overviewPageName);
                    if (overviewPage && overviewPage.getControls().length > 0) {
                        overviewPage.getControls()[0].redraw();
                    }
                        context.dismissActivityIndicator();
                        return Promise.resolve();
                });
            }).catch(() => {
                context.dismissActivityIndicator();
                return Promise.resolve();
            });
        });

     }).catch(() => {
        context.dismissActivityIndicator();
    });
}