// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Coordinate } from 'src/app/util/Coordinates';
const bboxTopRight: Coordinate = {
  latitude: -23.5273,
  longitude: -46.833881
};

const bboxBottomLeft: Coordinate = {
  latitude: -23.537519,
  longitude: -46.840019
};

export const environment = {
  production: false,
  topRight: bboxTopRight,
  bottomLeft: bboxBottomLeft
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
