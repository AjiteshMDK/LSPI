///import { v4 as uuidv4 } from 'uuid';
const BYTE_LENGTH = 20;
import isWindows from '../../Common/IsWindows'

/**
 * 
 * @returns {string}
 */
 export default function FormGuidCreate(clientAPI) {
    // IDs for SDF are 40 hex characters long (160 bits, 20 bytes)
    // TODO: use a proper rng for this
    const uuidValue = isWindows(clientAPI) ? clientAPI.mdkWindows.uuidModule.generateUuidV4Sync() : uuidv4();
    return (uuidValue + uuidValue).replace(/\-/g,'').substring(0,BYTE_LENGTH * 2);
}
