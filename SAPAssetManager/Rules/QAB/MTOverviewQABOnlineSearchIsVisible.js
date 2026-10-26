import QABSettingsWindows from "./QABSettingsWindows";
import IsOnlineSearchEnabled from "../OnlineSearch/IsOnlineSearchEnabled";
import PersonaLibrary from "../Persona/PersonaLibrary";
import NetworkMonitoringLibrary from "../Common/Library/NetworkMonitoringLibrary";

function isOnlineSearch(context) {
    return IsOnlineSearchEnabled(context) && 
        (PersonaLibrary.isFieldServiceTechnicianPro(context) || PersonaLibrary.isMaintenanceTechnician(context)) && 
        NetworkMonitoringLibrary.isNetworkConnected(context);
}

export default function MTOverviewQABOnlineSearchIsVisible(context) {
    return QABSettingsWindows.isButtonVisible(context, 'ONLINE_SEARCH', isOnlineSearch);
}