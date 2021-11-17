import { Injectable } from '@angular/core';
import { LatLngBounds, LatLngBoundsExpression, Rectangle } from 'leaflet';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Coordinate } from '../util/Coordinates';

@Injectable({
  providedIn: 'root'
})
export class BoundServiceService {
  public boundsUpdate = new Subject();

  public get topRight(): Coordinate {
    return this.internTopRight;
  }
  public set topRight(value: Coordinate) {
    this.internTopRight = value;
    localStorage.setItem(this.topRigthKey, JSON.stringify(value));
    this.boundsUpdate.next();
  }
  public get bottomLeft(): Coordinate {
    return this.internBottomLeft;
  }
  public set bottomLeft(value: Coordinate) {
    this.internBottomLeft = value;
    localStorage.setItem(this.bottomLeftKey, JSON.stringify(value));
    this.boundsUpdate.next();
  }

  private internTopRight: Coordinate;
  private internBottomLeft: Coordinate;

  private readonly bottomLeftKey = 'bottomLeft';
  private readonly topRigthKey = 'topRight';

  constructor() {
    this.bottomLeft = JSON.parse(localStorage.getItem(this.bottomLeftKey) ) || environment.bottomLeft;
    this.topRight = JSON.parse(localStorage.getItem(this.topRigthKey)) || environment.topRight;
  }

  public getBounds(): LatLngBounds {
    return new LatLngBounds(
      [this.bottomLeft.latitude, this.bottomLeft.longitude],
      [this.topRight.latitude, this.topRight.longitude]
    );
  }
  public getRectangle() {
    return new Rectangle(this.getBounds());
  }
}

