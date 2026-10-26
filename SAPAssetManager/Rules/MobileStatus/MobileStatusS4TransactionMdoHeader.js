import BackendAppVersionNumber from '../UserProfile/BackendAppVersionNumber';

export default function MobileStatusS4TransactionMdoHeader(context) {
    return BackendAppVersionNumber(context).then(appVersion => {
        return `SAM${appVersion}_S4_SRV_MOBILE_STATUS`;
    });
}
