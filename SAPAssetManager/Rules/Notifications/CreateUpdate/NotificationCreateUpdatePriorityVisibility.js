import PriorityQueryOptions from '../PriorityQueryOptions';
/**
* Set visibility of priority segmented control/list picker based on OS and priority count
* A special thanks to Global Design for this mandate.
* @param {IFormCellProxy} context control context
*/
export default function NotificationCreateUpdatePriorityVisibility(context) {
	return context.count('/SAPAssetManager/Services/AssetManager.service', 'Priorities', PriorityQueryOptions(context)).then(priorityCount => {
		if (priorityCount > 5) { // iOS limits segmented control buttons to 5
			return context.getName() !== 'PrioritySeg';
		} else {
			return context.getName() === 'PrioritySeg';
		}
	});
}
