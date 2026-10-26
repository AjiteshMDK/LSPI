import IsS4ServiceIntegrationEnabled from '../ServiceOrders/IsS4ServiceIntegrationEnabled';
import S4OverviewMapQueryOptions from './S4OverviewMapQueryOptions';
import FSMOverviewMapQueryOptions from './FSMOverviewMapQueryOptions';

export default function FSMServiceOverviewQueryOptions(context) {  
    if (IsS4ServiceIntegrationEnabled(context)) {
        return S4OverviewMapQueryOptions(context);
    } else {
        return FSMOverviewMapQueryOptions(context);
    }
}
