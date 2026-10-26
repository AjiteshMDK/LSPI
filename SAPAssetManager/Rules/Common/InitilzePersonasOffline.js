/**
* Describe this function...
* @param {IClientAPI} context
*/
import libPersona from '../Persona/PersonaLibrary';
export default function InitilzePersonasOffline(context) {
    return context.executeAction('/SAPAssetManager/Actions/OData/InitializeOfflineOData.action').then(function() {
        return context.read('/SAPAssetManager/Services/AssetManager.service', 'UserPersonas', [], "$filter=UserPersona ne 'INVENTORY_CLERK'").then(function(userPersonasResults) {
            libPersona.initializePersona(context, userPersonasResults);
        }).catch(function(err) {
            Logger.error(`Failed to read Offline OData Service: ${err}`);
            context.getClientData().Error=err;
            return false;
        });
    }).catch(function(err) {
        // Could not init offline service
        Logger.error(`Failed to initialize Offline OData Service: ${err}`);
        return false;
    });
}
