//import IsAndroid from '../Common/IsAndroid';
import libPersona from '../Persona/PersonaLibrary';
//import QABRedrawExtension from '../QAB/QABRedrawExtension';
import QABSettingsWindows from '../QAB/QABSettingsWindows';
import CommonLibrary from '../Common/Library/CommonLibrary';

export default async function FSMOverviewOnPageReturning(context) {
    if (libPersona.isFieldServiceTechnician(context)) {
        //let sectionedTable = context.getControls()[0];
        //let mapSection = sectionedTable.getSection('MapExtensionSection');

        // if (mapSection && mapSection.getVisible() !== false) {
        //     let mapViewExtension = mapSection.getExtensions()[0];
        //     if (IsAndroid(context)) {
        //         mapSection.redraw(true);
        //     } else {
        //         mapViewExtension.update();
        //     }
        // }

        // let s4MapSection = sectionedTable.getSection('S4MapExtensionSection');
        // if (s4MapSection && s4MapSection.getVisible() !== false) {
        //     let mapViewExtension = s4MapSection.getExtensions()[0];
        //     if (IsAndroid(context)) {
        //         mapSection.redraw(true);
        //     } else {
        //         mapViewExtension.update();
        //     }
        // }

        // Refresh the QAB
        // let qabSection = sectionedTable.getSection('QuickActionBarExtensionSection');
        // if (qabSection) {
        //     QABRedrawExtension(context);
        // }

        CommonLibrary.redrawActionBar(context);
        QABSettingsWindows.refreshQABs(context);

        // let visibleButtons = await QABSettingsWindows.getQABVisibilityFromUserPreferences(context);
        // ///read from userPrefs if no entry assume all buttons need to be visible
        // if (visibleButtons) {
        //      context.getClientData().visibleQABButtons = visibleButtons;
        //  } else {
        //      context.getClientData().visibleQABButtons = context.getPageProxy().getControls()[0].getSection('QABButtons')._context.element._props.definition._data.Buttons.map(item => item._Name)
        //  }
        //      context.getPageProxy().getControls()[0].getSection('QABButtons').redraw();
    }
}
