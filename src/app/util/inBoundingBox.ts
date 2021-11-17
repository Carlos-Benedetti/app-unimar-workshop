import { environment } from 'src/environments/environment';
import { Coordinate } from './Coordinates';

export const inBoundingBox = (bottomLeft: Coordinate, topRight: Coordinate, point: Coordinate): boolean => {
    const isLongInRange: boolean = point.longitude >= bottomLeft.longitude && point.longitude <= topRight.longitude;
    const isLatiInRange: boolean = point.latitude >= bottomLeft.latitude && point.latitude <= topRight.latitude;
    return (isLongInRange && isLatiInRange);
};
export const inRoom = (latitude: number, longitude: number): boolean => {
    const point: Coordinate = {
        latitude,
        longitude
    };
    return inBoundingBox(environment.bottomLeft, environment.topRight, point);
};

