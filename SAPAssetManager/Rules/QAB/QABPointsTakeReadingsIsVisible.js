import MeasuringPointsTakeReadingsIsVisible from "../Measurements/Points/MeasuringPointsTakeReadingsIsVisible";
import QABSettingsWindows from "./QABSettingsWindows";

export default function QABPointsTakeReadingsIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'TAKE_READINGS', MeasuringPointsTakeReadingsIsVisible);
}
