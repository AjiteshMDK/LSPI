import libCommon from '../../Common/Library/CommonLibrary';
import mobileStatusEAMObjectType from '../../MobileStatus/MobileStatusEAMObjectType';

export default function MobileStatusReviewUpdateLinks(context, mobileInstance) {
    let updateLinks = [];
    const reviewMobileStatus = libCommon.getAppParam(context, 'MOBILESTATUS', context.getGlobalDefinition('/SAPAssetManager/Globals/MobileStatus/ParameterNames/ReviewParameterName.global').getValue());
    const eamObjType = mobileStatusEAMObjectType(context, mobileInstance);
    let overallStatusCfg_NavLink = context.createLinkSpecifierProxy(
        'OverallStatusCfg_Nav',
        'EAMOverallStatusConfigs',
        `$filter=MobileStatus eq '${reviewMobileStatus}' and ObjectType eq '${eamObjType}'`,
        mobileInstance['@odata.readLink']
    );
    updateLinks.push(overallStatusCfg_NavLink.getSpecifier());
    return updateLinks;
}
