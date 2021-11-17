import { Injectable } from '@angular/core';
import { Geolocation, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { Observable, Subject } from 'rxjs';
import { Coordinate } from '../util/Coordinates';

@Injectable({
  providedIn: 'root',
})
export class UserPositionService {
  public watchPosition = new Subject<Coordinate>();
  private watch: Observable<Geoposition | PositionError>;
  constructor(private geolocation: Geolocation) {
    this.watch = this.geolocation.watchPosition({ enableHighAccuracy: true, maximumAge: 0 });
    this.watch.subscribe((data) => {
      //se a posição for valida, verifica se ela esta dentro do perimetro
      if (this.isValidPosition(data)) {
        this.watchPosition.next(data.coords);
      }
    });
  }

  private isValidPosition(data: Geoposition | PositionError): data is Geoposition {
    return 'coords' in data;
  }
}
