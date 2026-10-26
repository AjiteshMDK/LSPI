import MDKVersionInfo from '../UserProfile/MDKVersionInfo';
import ApplicationSettings from '../Common/Library/ApplicationSettings';
import PersonaLibrary from '../Persona/PersonaLibrary';
import ValidationLibrary from '../Common/Library/ValidationLibrary';

/**
* Updates App Information for cloud reporting metrics.
* Checks if App Info has changed or does not exist.
* Updates App Info if nonexistent or changed, then
* Does a fake entity update on UserGeneralInfos
* so a record is generated with updated app info in
* the header.
* @param {IClientAPI} context
*/
export default async function AppInformationHeader(context) {
    const savedXappinfo = ApplicationSettings.getString(context, 'xappinfo');
    if (isHeaderComplete(savedXappinfo)) {
        return savedXappinfo;
    }

    const userSystemInfos = readUserSystemInfos(context);
    const appName = 'SAP Service and Asset Manager'; // This should be the hardcoded app name
    const appVersion = context.getVersionInfo()['Application Version'];
    const backendVersion = getBackendVersion(context, userSystemInfos);
    const mdkVersion = MDKVersionInfo(context);
    const platform = (function () {
        if (context.nativescript?.platformModule?.isIOS) {
            return 'ios';
        } else if (context.nativescript?.platformModule?.isAndroid) {
            return 'android';
        } else if (context.nativescript?.applicationModule?.windows) {
            return 'windows';
        } else {
            return 'unknown';
        }
    })();

    let personas = getPersonas(context);
    let xappinfo = `name=${appName};version=${appVersion};backend-version=${backendVersion};persona=${personas.join()};mdk-version=${mdkVersion};platform=${platform}`;
    ApplicationSettings.setString(context, 'xappinfo', xappinfo);
    return xappinfo;
}

function getPersonas(context) {
    let userpersonas = PersonaLibrary.getPersonas(context);
    let personas = [];
    for (const persona of userpersonas) {
        switch (persona) {
            case 'MAINTENANCE_TECHNICIAN_STD':
            case 'MAINTENANCE_TECHNICIAN':
            case 'FIELD_SERVICE_TECHNICIAN_PRO':
            case 'FIELD_SERVICE_TECHNICIAN':
            case 'SAFETY_TECHNICIAN':
            case 'INVENTORY_CLERK':
                personas.push(persona);
                break;
            default:
                personas.push('CUS_PERSONA');
                break;
        }
    }
    return personas;
}

function readUserSystemInfos(context) {
    const userSystemInfos = ApplicationSettings.getString(context, 'UserSystemInfos');
    if (!ValidationLibrary.evalIsEmpty(userSystemInfos)) {
        return JSON.parse(userSystemInfos);
    }
    return null;
}

/**
 * Gets backend version from UserSystemInfos. If in demo mode or backend version hasn't been found in UserSystemInfos,
 * returns string 'empty' so that we can distinguish from the use case when UserSystemInfos is not available yet.
 * String 'empty' will not be put into actual header value.
 * @param {IClientAPI} context 
 * @param {Array<UserSystemInfo>} userSystemInfos 
 */
function getBackendVersion(context, userSystemInfos) {
    if (context.isDemoMode()) {
        return '';
    }

    let version = ApplicationSettings.getString(context, 'BackendVersion');
    if (version) {
        return version;
    }

    const config = findConfig(userSystemInfos);

    if (config) {
        if (ValidationLibrary.evalIsEmpty(config.SystemSettingValue)) {
            return '';
        }

        version = config.SystemSettingName + ' ' + config.SystemSettingValue;
        ApplicationSettings.setString(context, 'BackendVersion', version);
        return version;
    } else {
        return '';
    }
}

function findConfig(userSystemInfos) {
    const configNames = ['S4CORE', 'S4MERP', 'SMERP'];
    if (userSystemInfos?.length > 0) {
        let config = null;
        for (const name of configNames) {
            config = userSystemInfos.filter(item => item.SystemSettingName === name)?.[0];

            if (config) {
                return config;
            }
        }
        return {
            SystemSettingValue: '',
        };
    }
    return null;
}

/**
 * Checks if header value is not empty and contains all info (backend version and client role that are read from online store)
 * @param {string} header header value that was saved to app settings after previous execution
 * Example string: 
 * 'name={name};version={version};backend-version={backend-version};persona={persona};mdk-version={mdk-version};platform={platform};systemClientRole={systemClientRole}'
 * @returns {boolean} is header value not empty and complete
 */
function isHeaderComplete(header) {
    if (ValidationLibrary.evalIsEmpty(header)) {
        return false;
    }

    const headerComponents = header.split(';');
    //Array.find() is not supported in windows so we used Array.filter()[0] instead
    const backendVersion = headerComponents.filter(component => component.includes('backend-version'))[0];

    if (!backendVersion) {
        return false;
    }

    return !!backendVersion.replace('backend-version=', '');
}
