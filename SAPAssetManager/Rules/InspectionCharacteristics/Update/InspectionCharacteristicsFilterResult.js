/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
import libComm from "../../Common/Library/CommonLibrary";
export default function InspectionCharacteristicsFilterResult(context) {
    let filters = [];
	if (libComm.isDefined(libComm.getTargetPathValue(context,'#Page:InspectionCharacteristicsFDCFilter/#Control:FilterSeg/#FilterValue'))) {
		filters.push(context.evaluateTargetPath('#Page:InspectionCharacteristicsFDCFilter/#Control:FilterSeg/#FilterValue'));
	}
	if (libComm.isDefined(libComm.getTargetPathValue(context,'#Page:InspectionCharacteristicsFDCFilter/#Control:Operations/#FilterValue'))){
		filters.push(context.evaluateTargetPath('#Page:InspectionCharacteristicsFDCFilter/#Control:Operations/#FilterValue'));
	}
	if (libComm.isDefined(libComm.getTargetPathValue(context,'#Page:InspectionCharacteristicsFDCFilter/#Control:FuncLoc/#FilterValue'))){
		filters.push(context.evaluateTargetPath('#Page:InspectionCharacteristicsFDCFilter/#Control:FuncLoc/#FilterValue'));
	}
	if (libComm.isDefined(libComm.getTargetPathValue(context,'#Page:InspectionCharacteristicsFDCFilter/#Control:Equipment/#FilterValue'))){
		filters.push(context.evaluateTargetPath('#Page:InspectionCharacteristicsFDCFilter/#Control:Equipment/#FilterValue'));
	}

	return filters;
}
