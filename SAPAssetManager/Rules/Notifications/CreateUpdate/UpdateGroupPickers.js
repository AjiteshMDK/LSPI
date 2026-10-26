import NotificationItemTaskCreateUpdateCode from '../Item/Cause/CreateUpdate/NotificationItemCauseCreateUpdateCode';
import NotificationItemCreateUpdateDamage from '../Item/CreateUpdate/NotificationItemCreateUpdateDamage';
import NotificationItemCreateUpdatePart from '../Item/CreateUpdate/NotificationItemCreateUpdatePart';

/**
* Update Part Group, Damage Group, and Cause Group pickers
* after Type, FLOC, or Equipment changes
* @param {IClientAPI} context
*/
export default function UpdateGroupPickers(context) {
	let partGroupPicker = context.getPageProxy().evaluateTargetPathForAPI('#Control:PartGroupLstPkr');
	let partGroupPickerPromise = NotificationItemCreateUpdatePart(partGroupPicker);

	let damageGroupPicker = context.getPageProxy().evaluateTargetPathForAPI('#Control:DamageGroupLstPkr');
	let damageGroupPickerPromise = NotificationItemCreateUpdateDamage(damageGroupPicker);

	let causeGroupPicker = context.getPageProxy().evaluateTargetPathForAPI('#Control:CauseGroupLstPkr');
	let causeGroupPickerPromise = NotificationItemTaskCreateUpdateCode(causeGroupPicker);

	return Promise.all(partGroupPickerPromise, damageGroupPickerPromise, causeGroupPickerPromise);
}
