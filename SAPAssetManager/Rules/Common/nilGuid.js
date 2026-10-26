//import { NIL as NIL_UUID } from 'uuid';

/**
 * @return<String> the '00000000-0000-0000-0000-000000000000' GUID value
 */
 export default function nilGuid(clientAPI) {
    const uuidvalue = clientAPI.mdkWindows.uuidModule.NIL();
    return uuidvalue;
    ///return NIL_UUID;
}
