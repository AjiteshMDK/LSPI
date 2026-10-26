//import { CoreTypes } from '@nativescript/core';
//import * as geolocation from '@nativescript/geolocation';

export default async function StartTracking(cbFunc, cbParam, updateDistance, context) {
    const options = {
        "desiredAccuracy": 'High',
        "updateDistance": updateDistance,
        "updateTime": 2000
      };

      const watchId = await context.mdkWindows.geolocationModule.watchLocation(
		(locationData) => {
         let geoJson = {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [],
            },
            'properties': null,
         };
        geoJson.geometry.coordinates.push([locationData.latitude, locationData.longitude]);
        if (cbFunc) {
            if (cbParam) {
                cbFunc(geoJson, cbParam);
            }
        }
		},
		(error) => {
			const message = `${new Date().toLocaleString()} => ${error}` + "\n" + message;
			logMessageControl.setValue(message);
		},
		options
	);

	if (watchId > 0) {
        return watchId;
	} else {
        return -1;
    }

	///logMessageControl.setValue(message);


    // try {
    //     let watchID = geolocation.watchLocation(
    //         (loc) => {
    //             if (loc) {
    //                 let geoJson = {
    //                     'type': 'Feature',
    //                     'geometry': {
    //                         'type': 'Point',
    //                         'coordinates': [],
    //                     },
    //                     'properties': null,
    //                 };
    //                 geoJson.geometry.coordinates.push([loc.latitude, loc.longitude]);
    //                 if (cbFunc) {
    //                     if (cbParam) {
    //                         cbFunc(geoJson, cbParam);
    //                     }
    //                 }
    //             }
    //         }, () => {
    //             // errors
    //             return -1;
    //         },
    //         {
    //             desiredAccuracy: CoreTypes.Accuracy.high,
    //             updateDistance: updateDistance,
    //             iosAllowsBackgroundLocationUpdates: true,
    //         });
    //     return watchID;
    // } catch (ex) {
    //     // errors
    //     return -1;
}
