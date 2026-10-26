import ButtonEnabled from "./WorkOrderDetailsQABMeterButton";
import QABSettingsWindows from "./QABSettingsWindows";


async function IsButtonEnabled(context) {
    let enabled = await ButtonEnabled(context, 'Enabled');
    return enabled;
}

export default function WorkorderDetailsQABMeterButtonIsVisible(context) {
    
    return QABSettingsWindows.isButtonVisible(context, 'METER_QAB_ACTION', IsButtonEnabled);
}
