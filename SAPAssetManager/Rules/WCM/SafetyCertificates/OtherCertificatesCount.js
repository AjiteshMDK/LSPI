import SafetyCertificatesLibrary from './SafetyCertificatesLibrary';

export default function OtherCertificatesCount(context) {
    return SafetyCertificatesLibrary.getCertificatesCount(context, SafetyCertificatesLibrary.GetOtherCertificateFilterTerm());
}