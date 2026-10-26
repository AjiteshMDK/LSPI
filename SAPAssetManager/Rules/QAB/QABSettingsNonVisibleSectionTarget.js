import { QABSettingsPage } from './QABSettings';
import IsWindows from '../Common/IsWindows';

export default function QABSettingsNonVisibleSectionTarget(context) {
    return IsWindows(context) ? context.getPageProxy().getControls()[0].getSection('QABButtons')._context.element._props.definition._data.Buttons : QABSettingsPage.getSectionTarget(context, QABSettingsPage.typeNonVisible);
}