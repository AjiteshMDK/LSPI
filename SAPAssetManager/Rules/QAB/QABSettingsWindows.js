import PersonaLibrary from '../Persona/PersonaLibrary';
import Logger from '../Log/Logger';
import libVal from '../Common/Library/ValidationLibrary';
import CommonLibrary from '../Common/Library/CommonLibrary';
export default class QABSettingsWindows {

    static getQABSettings(context) {
        const preferenceGroup = context.getGlobalDefinition('/SAPAssetManager/Globals/QAB/PreferenceGroup.global').getValue();
        const persona = PersonaLibrary.getActivePersona(context);
        const pageName = context.evaluateTargetPathForAPI('#Page:-Previous').getPageProxy()._page._definition.getName();
        const preferenceName = `${persona}-${pageName}`;

        return context.read(
            '/SAPAssetManager/Services/AssetManager.service', 
            'UserPreferences', 
            [], 
            `$filter=PreferenceGroup eq '${preferenceGroup}' and PreferenceName eq '${preferenceName}'`
        ).catch(error => {
            Logger.error(`Error reading QAB settings from db for PreferenceGroup='${preferenceGroup}', PreferenceName='${preferenceName}'`, error);
            throw error;
        });
    }

    static getItemAccessoryType(context) {
        const btnDict = context.evaluateTargetPathForAPI('#Page:-Previous').getPageProxy().getClientData().QABButtonDictionary;
        const btnName = context.binding?._Name;

        if (CommonLibrary.isDefined(btnDict) && CommonLibrary.isDefined(btnName)) {
            const showBtnCheckmark = btnDict.hasOwnProperty(btnName) && btnDict[btnName].Enabled && btnDict[btnName].Visible;
            return showBtnCheckmark ? 'checkmark' : 'none';
        }
        return 'none';
    }
    
    static itemOnPress(context) {
        const pageProxy = context.getPageProxy();
        const binding = pageProxy.getActionBinding();
        const name = binding._Name;

        let btnDict = context.evaluateTargetPathForAPI('#Page:-Previous').getPageProxy().getClientData().QABButtonDictionary;
        if (CommonLibrary.isDefined(btnDict) && CommonLibrary.isDefined(name)) {
            //Toggle visibly of quick action button
            btnDict[name].Visible = !btnDict[name].Visible;
        }

        context.redraw();
    }

    static findQABButtonDictFromUserPreferences(context) {
        const preferenceGroup = context.getGlobalDefinition('/SAPAssetManager/Globals/QAB/PreferenceGroup.global').getValue();
        const persona = PersonaLibrary.getActivePersona(context);
        const pageName = context.getPageProxy()._page._definition.getName();
        const preferenceName = `${persona}-${pageName}`;

        return context.read('/SAPAssetManager/Services/AssetManager.service',
            'UserPreferences',
            [],
            `$filter=PreferenceGroup eq '${preferenceGroup}' and PreferenceName eq '${preferenceName}'`)
        .then(result => {
            const settingsRecord = result?.getItem(0);
            if (!libVal.evalIsEmpty(settingsRecord) && settingsRecord?.PreferenceValue) {
                context.getPageProxy().getClientData().QABButtonDictionary = JSON.parse(settingsRecord?.PreferenceValue);
                return true;
            }
            return false;
        }).catch(error => {
            Logger.error(`Error fetching QAB settings from UserPreferences. PreferenceGroup: '${preferenceGroup}', PreferenceName: '${preferenceName}'`, error);
            throw error;
        });
    }

     /**
     * Checks if a specific button should be visible based on function isBtnEnabledCallbackFn and if visible property is true.
     * @param {Object} context - The context object providing necessary information.
     * @param {string} btnName - The key identifying the button to check.
     * @param {Function} isBtnEnabledCallbackFn - A function that returns a boolean indicating if the button should be enabled.
     * @returns {Promise<boolean>} - A promise that resolves to true if the button should be visible, otherwise false.
     */
     static isButtonVisible(context, btnName, isBtnEnabledCallbackFn = undefined) {
        let btnDict = context.getPageProxy().getClientData().QABButtonDictionary;
        if (libVal.evalIsEmpty(btnDict)) {
            return this.findQABButtonDictFromUserPreferences(context).then((qabBtnDictFound) => {
                if(!qabBtnDictFound) {
                    return new Promise((resolve) => {
                        if (!context.getPageProxy().getClientData().hasOwnProperty('QABButtonDictionary')) {
                            context.getPageProxy().getClientData().QABButtonDictionary = {};
                        }
                        resolve();
                    }).then(() => {
                        return this.isButtonVisible(context, btnName, isBtnEnabledCallbackFn);
                    });
                }
                return this.isButtonVisible(context, btnName, isBtnEnabledCallbackFn);
            }).catch(error => {
                Logger.error(`Error checking if button '${btnName}' is visible from previously saved QAB settings.`, error);
                return false;
            });
        }
        return this.isButtonEnabled(context, btnName, isBtnEnabledCallbackFn).then(() => {
            return btnDict[btnName].Enabled && btnDict[btnName].Visible;                   
        }).catch(error => {
            Logger.error(`Error checking if button '${btnName}' is enabled via callback function '${isBtnEnabledCallbackFn}'`, error);
            return btnDict[btnName].Visible;
        });
    }

    static async isButtonEnabled(context, btnName, isBtnEnabledCallbackFn = undefined) {
        let btnDict = context.getPageProxy().getClientData().QABButtonDictionary;
        if (libVal.evalIsEmpty(btnDict)) {
            return true;
        }

        let isBtnEnabled = true;
        if (isBtnEnabledCallbackFn) {
            isBtnEnabled = await isBtnEnabledCallbackFn(context);
        }

        if (btnDict.hasOwnProperty(btnName)) {
            btnDict[btnName].Enabled = isBtnEnabled;
        } else {
            btnDict[btnName] = { Enabled: isBtnEnabled, Visible: true };
        }

        return isBtnEnabled;
    }

    static refreshQABs(context) {
        context.getPageProxy().getControls()[0].getSection('QABButtons').redraw();
    }

    static async onSaveOnPress(context) {
        const pageProxy = context.getPageProxy();
        const currentPageClientData = pageProxy.getClientData();

        try {
            pageProxy.showActivityIndicator();
            const btnDict = context.evaluateTargetPathForAPI('#Page:-Previous').getPageProxy().getClientData().QABButtonDictionary;
            
            if (CommonLibrary.isDefined(btnDict)) {
                const persona = PersonaLibrary.getActivePersona(context);
                const pageName = context.evaluateTargetPathForAPI('#Page:-Previous').getPageProxy()._page._definition.getName();
                currentPageClientData.preferenceName = `${persona}-${pageName}`;
                currentPageClientData.preferenceValue = JSON.stringify(btnDict, null, 2);
            }

            const qabReadResults = await this.getQABSettings(context);
            const qabRecordFromDB = qabReadResults.getItem(0);

            if (libVal.evalIsEmpty(qabRecordFromDB)) {
                await pageProxy.executeAction('/SAPAssetManager/Actions/QAB/QABSettingsCreate.action');
            } else {
                currentPageClientData.readLink = qabRecordFromDB['@odata.readLink'];
                await pageProxy.executeAction('/SAPAssetManager/Actions/QAB/QABSettingsUpdate.action');
            }
        } catch (error) {
            Logger.error('Error saving QAB settings:', error);
        } finally {
            pageProxy.dismissActivityIndicator();
        }

        pageProxy.executeAction('/SAPAssetManager/Actions/Page/ClosePage.action');
    }
}