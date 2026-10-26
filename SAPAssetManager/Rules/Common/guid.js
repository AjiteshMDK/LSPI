//import { v4 as uuidv4 } from 'uuid';
import IsWindows from "./IsWindows"
/**
 * @return<String> a GUID value
 */
 export default function generateGUID(clientAPI) {
    //MDK Win Implementation
    return IsWindows(clientAPI) ? clientAPI.mdkWindows.uuidModule.generateUuidV4Sync().toUpperCase().substring(0, 32) : uuidv4().toUpperCase().substring(0, 32);
}
