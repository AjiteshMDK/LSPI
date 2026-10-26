
//import { CoreTypes } from '@nativescript/core';
///import * as geolocation from '@nativescript/geolocation';
import libCommon from "../../Common/Library/CommonLibrary";

export default async function GetCurrentLocation(context) {
   let updateDistance = libCommon.getAppParam(context, 'LOCATION_TRACKING', 'DistanceBasedTracking') === 'Y' ?
        parseFloat(libCommon.getAppParam(context, 'LOCATION_TRACKING', 'DistanceThreshold')) : undefined;
    const options = {
        "desiredAccuracy": 'High',
        "updateDistance": updateDistance,
        "updateTime": 2000
      };
      const locationData = await context.mdkWindows.geolocationModule.getCurrentLocation(options);
      let geoJson = {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [],
        },
        'properties': null,
     };
     geoJson.geometry.coordinates.push([locationData.latitude, locationData.longitude]);
     return geoJson
    // return geolocation.getCurrentLocation({
    //     desiredAccuracy: CoreTypes.Accuracy.high,
    //     maximumAge: 5000,
    //     timeout: 10000,
    // }).then((loc) => {
    //         if (loc) {
    //             let geoJson = {
    //                 'type': 'Feature',
    //                 'geometry': {
    //                     'type': 'Point',
    //                     'coordinates': [],
    //                 },
    //                 'properties': null,
    //             };
    //             geoJson.geometry.coordinates.push([loc.latitude, loc.longitude]);
    //             return Promise.resolve(geoJson);
    //         } else {
    //             // location not found
    //             return Promise.resolve();
    //         }
    //     }, () => {
    //         // errors
    //         return Promise.resolve();
    //     });
}
