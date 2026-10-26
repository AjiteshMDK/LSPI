import CommonLibrary from '../../../../Common/Library/CommonLibrary';
import EDTHelper from '../MeasuringPointsEDTHelper';

export default function MeasuringPointsEDTKPIValue(context) {
    let sections = CommonLibrary.getStateVariable(context, 'EDTSectionBindings');
    //let points = sections.flat(); //array.flat() is not supported by Windows client Chakra JS engine. Do NOT use.
    let points = [].concat.apply([], sections); //Alternate code to flatten array.
    let {allCount, completedCount} = EDTHelper.getSectionCompletionCounts(context, points);

    return completedCount + '/' + allCount;
}
