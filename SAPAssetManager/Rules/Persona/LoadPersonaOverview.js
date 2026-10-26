import libPersona from './PersonaLibrary';
import Logger from '../Log/Logger';

/**
 *
 * @param {*} context
 * @param {*} allowSkip - Should the navigate be skipped if the existing page matches the new page name?
 * @returns
 */
export default function LoadPersonaOverview(context, allowSkip = false, personaName = libPersona.getActivePersona(context)) {
    if (libPersona.isMaintenanceTechnician(context)) {
        return context.executeAction('/SAPAssetManager/Actions/Persona/MTPro.action');
    } else if (libPersona.isMaintenanceTechnicianStd(context)) {
        return context.executeAction('/SAPAssetManager/Actions/Persona/MT.action');
    // } else if (libPersona.isInventoryClerk(context)) {
        //IM is not supported in Window 3.0 
    //     return context.executeAction('/SAPAssetManager/Actions/Persona/IM.action');
    } else if (libPersona.isFieldServiceTechnician(context) || libPersona.isFieldServiceTechnicianPro(context)) {
        return context.executeAction('/SAPAssetManager/Actions/Persona/FSM.action');
    } else if (libPersona.isWCMOperator(context)) {
        return context.executeAction('/SAPAssetManager/Actions/Persona/WCM.action');
    } else if (libPersona.isCustomPersona(context)) {
        Logger.error('Persona', 'Invalid persona: ' + personaName + ', cannot load custom persona. Please set up the custom persona page on your metadata');
        return Promise.resolve();
    } else {
        Logger.error('Persona', 'Invalid persona: ' + personaName + ', cannot load persona based overview page');
        return context.executeAction({
            'Name': '/SAPAssetManager/Actions/User/HomePageMissingMessage.action',
            'Properties' : {
                'Message': context.localizeText('home_page_missing_for_the_selected_persona_x', [personaName]),
            },
        }).then(() => {
            return context.executeAction('/SAPAssetManager/Actions/Persona/LandingPage.action');
        });
    }
}

/**
 *
 * @param {*} context
 * @param {*} itemName
 * @param {*} allowSkip
 * @returns
 */
function setPersonaMenuItem(context, itemName, allowSkip) {
    let sleepTime = 750;
    let navigate = true;

    Logger.info('Start redraw for ' + itemName);
    return context.getGlobalSideDrawerControlProxy().redraw().then(() => {
        return sleep(sleepTime).then(() => {
            if (allowSkip && context.getGlobalSideDrawerControlProxy().getSelectedMenuItemName() === itemName) {
                navigate = false;
            }
            if (navigate) {
                context.getGlobalSideDrawerControlProxy().setSelectedMenuItemByName(itemName);
            }
            return sleep(sleepTime).then(() => {
                Logger.info('Done redraw for ' + itemName);
                return Promise.resolve();
            });
        });
    });
}

function sleep(ms) {
    return (new Promise((resolve) => {
        Logger.info('Sleeping for ' + ms);
        setTimeout(function() {
            Logger.info('Done sleeping for ' + ms);
            resolve();
        }, ms);
    }));
}
