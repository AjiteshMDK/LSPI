import QABSettings from './QABSettingsWindows';
import libPersona from '../Persona/PersonaLibrary';
import NewMeterSectionLibrary from '..//Meter/Common/NewMeterSectionLibrary';
import IsMeterComponentEnabled from '../ComponentsEnablement/IsMeterComponentEnabled';
import libCommon from '../Common/Library/CommonLibrary';



export default function WorkorderDetailsQABMeterButton(currentContext, field = "") {
    const isMT = libPersona.isMaintenanceTechnician(currentContext);
    const meterEnabled = IsMeterComponentEnabled(currentContext);
    
    if (!meterEnabled) {
        return Promise.resolve('');
    } else {

        // We might be on the QAB settings page, if so, the bound object is the button fragment,
        // so we need to get the bound object from the previous page.  Otherwise, use the
        // current bound object

        let pageName = libCommon.getPageName(currentContext);



        var context = pageName === 'QABSettingsPage' ? currentContext.evaluateTargetPathForAPI('#Page:-Previous')._context : currentContext;

        switch (field) {
            case 'Title':
                return NewMeterSectionLibrary.quickActionTargetValues(context, 'Label');
            case 'Image':
                return NewMeterSectionLibrary.quickActionTargetValues(context, 'Icon');
            case 'OnPress':
                return NewMeterSectionLibrary.quickActionTargetValues(context, 'Action');;
            case 'Enabled':
                return NewMeterSectionLibrary.newObjectCellSectionVisible(context, 'QAB');
            default:
                return Promise.resolve('');
        }
    }
};
