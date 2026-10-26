import common from '../../Common/Library/CommonLibrary';
import Logger from '../../Log/Logger';

/**
* Show/hide "Use Template" button
* @param {IClientAPI} context
*/
export default function ShowTemplateButton(context) {
	return context.read('/SAPAssetManager/Services/AssetManager.service', 'LongTextTemplates', [], '$top=1').then(template => {
		return common.IsOnCreate(context) && (template._array.length > 0);
	}).catch(error => {
		Logger.error('Error in ShowTemplateButton: ' + error);
		return false;
	});
}
