import IsS4ServiceIntegrationEnabled from '../ServiceOrders/IsS4ServiceIntegrationEnabled';

export default function FSMServiceOverviewEntitySet(context) {  
    if (IsS4ServiceIntegrationEnabled(context)) {
        return 'S4ServiceOrders';
    } else {
        return 'MyWorkOrderHeaders';
    }
}
