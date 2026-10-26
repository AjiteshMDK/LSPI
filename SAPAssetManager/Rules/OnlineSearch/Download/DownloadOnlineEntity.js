import libCom from '../../Common/Library/CommonLibrary';
import libVal from '../../Common/Library/ValidationLibrary';
import Logger from '../../Log/Logger';
import SetOnlineSearchActionBarItemVisibility from './SetOnlineSearchActionBarItemVisibility';
import OnlineSearchOnReturn from '../OnlineSearchOnReturn';

/**
* Perform the download of the selected equipment/floc
* @param {IClientAPI} context
*/
export default function DownloadOnlineEntity(context) {
    const pageProxy = context.getPageProxy();
    let binding = pageProxy.binding;
    if (!binding?.['@odata.readLink']) {
        binding = pageProxy.getActionBinding();
    }
    if (!libVal.evalIsEmpty(binding)) {
        const [equipObjectType, funcLocObjectType] = [
            '/SAPAssetManager/Globals/OnlineSearch/EquipmentObjectType.global',
            '/SAPAssetManager/Globals/OnlineSearch/FuncLocObjectType.global',
        ].map(path => context.getGlobalDefinition(path).getValue());
        const isEquipment = binding['@odata.type'] === '#sap_mobile.Equipment';
        const ObjectId = isEquipment ?
            binding.EquipId :
            binding.FuncLocIdIntern;
        const ObjectType = isEquipment ?
            equipObjectType :
            funcLocObjectType;

        return context.executeAction({
            'Name': '/SAPAssetManager/Actions/Inventory/Fetch/OnDemandObjectCreate.action',
            'Properties': {
                Properties: {
                    ObjectId,
                    ObjectType,
                    Action: 'I',
                },
                Headers: {
                    'OfflineOData.TransactionID': ObjectId,
                },
            },
        }).then(() => {
            return context.executeAction({
                'Name': '/SAPAssetManager/Actions/Inventory/Fetch/FetchUploadDocuments.action',
                'Properties': {
                    'OnSuccess': '/SAPAssetManager/Rules/OnlineSearch/Download/FetchDownloadEntity.js',
                    'OnFailure': '',
                },
            });
        }).catch((err) => {
            Logger.error('DownloadOnlineEntity', err);
            libCom.removeStateVariable(context, 'OnlineSearchDownloadInProgress');
            SetOnlineSearchActionBarItemVisibility(context);
            return context.executeAction('/SAPAssetManager/Actions/OnlineSearch/DownloadFailed.action').then(() => {return Promise.reject();});
        }).then(() => {
            return context.executeAction("/SAPAssetManager/Actions/OnlineSearch/DownloadCompleteBannerMessage.action").then(() => {
                const pageName = libCom.getCurrentPageName(context);
                if (pageName === 'OnlineSearch' || pageName === 'OnlineSearchEquipmentList' || pageName === 'OnlineSearchFuncLocList') {
                    return OnlineSearchOnReturn(context);
                }
            });
        });
    }
    return Promise.resolve();
}
