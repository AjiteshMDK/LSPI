import IsS4ServiceIntegrationEnabled from '../ServiceOrders/IsS4ServiceIntegrationEnabled';
import S4RouteOverviewMapQueryOptions from './S4RouteOverviewMapQueryOptions';
import FSMOverviewRouteMapQueryOptions from './FSMOverviewRouteMapQueryOptions';

export default function FSMServiceOverviewRouteQueryOptions(context) {  
    if (IsS4ServiceIntegrationEnabled(context)) {
        return S4RouteOverviewMapQueryOptions(context);
    } else {
        return FSMOverviewRouteMapQueryOptions(context);
    }
}
