import hideCancel from '../../ErrorArchive/HideCancelForErrorArchiveFix';
import common from '../../Common/Library/CommonLibrary';
import ODataDate from '../../Common/Date/ODataDate';
import {FDCSectionHelper} from '../../FDC/DynamicPageGenerator';

export default function HideCancelOnPageLoad(context) {

    let helper = new FDCSectionHelper(context);

    helper.run((sectionBinding, section, i) => {
        if (!sectionBinding) {
            sectionBinding = context.evaluateTargetPathForAPI('#Page:-Previous').getClientData().SectionBindings[i];
            if (!sectionBinding) {
                sectionBinding = {};
            }
        }

        const readPath = (function() {

            /* if we're doing an edit, the bound object is the ISUProcess that was deleted, so the @odata.readLink is invalid
            ** so we need to find the new one. the bound object should have all the fields we need, so we will build the readlink 
            */ 

            var link  = 'OrderISULinks(';

            var binding = context.binding.DisconnectObject_Nav !== undefined ? context.binding.DisconnectObject_Nav : context.binding;


            if (binding.ISUProcess && binding.ISUProcess.includes('_EDIT')) {
                let fields = ['ConnectionObject', 'DeviceCategory', 'DeviceLocation', 'DisconnectionNum', 'EquipmentNum', 'FunctionalLoc', 'Installation', 'OrderNum', 'Premise', 'SerialNum'];
                fields.forEach((field) => {
                    link += `${field}='${context.binding[field]}',`;
                });
                // Add the ISUProcess field, but remove the _EDIT suffix as it is not part of the OData field
                link += `ISUProcess='${binding.ISUProcess}')`.replace('_EDIT', '');
            } else {
                link = binding['@odata.readLink'];
            }

            return `${link}/Device_Nav/MeterReadings_Nav`;
        

        })();
        return context.read('/SAPAssetManager/Services/AssetManager.service', readPath, [], `$filter=sap.islocal() and Register eq '${sectionBinding.RegisterNum}'&$orderby=MeterReadingDate`).then(function(result) {
            if (result.length > 0) {
                let localReading = result.getItem(0);
                sectionBinding.MeterReadingRecorded = localReading.MeterReadingRecorded;
                sectionBinding.UsagePeakTimeBool = (localReading.DateMaxRead !== null);
                sectionBinding.MeterReaderNote = localReading.MeterReaderNote;

                let dateTime = new ODataDate(localReading.MeterReadingDate, localReading.MeterReadingTime);
                let dateMaxRead = localReading.DateMaxRead ?
                        new ODataDate(localReading.DateMaxRead, localReading.TimeMaxReading) :
                        dateTime;

                sectionBinding.MeterReadingDate = dateTime.toLocalDateString();

                if (sectionBinding.UsagePeakTimeBool) {
                    sectionBinding.DateMaxRead = dateMaxRead.toLocalDateString();
                }

                let readingValueControlProxy = section.getControl('ReadingValue');
                let peakTimeSwitchControlProxy = section.getControl('PeakTimeSwitch');
                let peakTimeControlProxy = section.getControl('PeakUsageTimeControl');
                let readingTimeControlProxy = section.getControl('ReadingTimeControl');
                let notePickerControlProxy = section.getControl('NotePicker');
                let discardButton = section.getControl('DiscardButton');

                readingValueControlProxy.setValue(sectionBinding.MeterReadingRecorded);
                peakTimeSwitchControlProxy.setValue(sectionBinding.UsagePeakTimeBool);
                peakTimeControlProxy.setValue(new Date(dateMaxRead._date - (common.getBackendOffsetFromSystemProperty(context) * 1000 * 3600 + new Date().getTimezoneOffset() * 60 * 1000)));
                readingTimeControlProxy.setValue(new Date(dateTime._date - (common.getBackendOffsetFromSystemProperty(context) * 1000 * 3600 + new Date().getTimezoneOffset() * 60 * 1000)));
                notePickerControlProxy.setValue(sectionBinding.MeterReaderNote);

                peakTimeControlProxy.setVisible(sectionBinding.UsagePeakTimeBool);
                discardButton.setVisible(Boolean(sectionBinding['@odata.editLink']));

                sectionBinding.MeterReadingReadLink = localReading['@odata.readLink'];
            }
        }).catch(() => Promise.resolve());
    });

    hideCancel(context);
    common.saveInitialValues(context);
}
