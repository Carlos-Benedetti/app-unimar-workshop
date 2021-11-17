import { AfterContentInit, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { inRoom } from '../util/inBoundingBox';
import { DivIcon, Icon, LatLngBounds, Map, Marker, Rectangle, TileLayer } from 'leaflet';
import { environment } from 'src/environments/environment';
import { BoundServiceService } from '../services/bound-service.service';
import { UserPositionService } from '../services/user-position.service';
import { Coordinate } from '../util/Coordinates';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public inBBox = false;
  public latitude: number;
  public longitude: number;
  map: Map;
  bottonLeftMarker: Marker<any>;
  topRightMarker: Marker<any>;
  meMarker: Marker<any>;
  rectangle: Rectangle<any>;

  get haveCoodenates(): boolean {
    return typeof this.latitude === 'number' && typeof this.longitude === 'number';
  }
  constructor(private userPositionService: UserPositionService, private boundServiceService: BoundServiceService) {
  };

  ionViewDidEnter(): void {
    this.leafletMap();
    this.userPositionService.watchPosition.subscribe(position => {
      this.checkPosition(position);
    });
  };


  checkPosition(position: Coordinate) {
    //verifica se esta no perimetro
    this.latitude = position.latitude;
    this.longitude = position.longitude;

    this.updateMarker();
    const inTheRoom = this.rectangle.getBounds().contains(this.meMarker.getLatLng());

    //se estiver avise
    if (inTheRoom) {
      this.inBBox = true;
    } else {
      this.inBBox = false;
    }
  }

  leafletMap() {
    if (!this.map) {
      this.map = new Map('homeMapDiv').setView([0, 0], 13);
      new TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Carlos Bene',
        maxNativeZoom: 19,
        maxZoom: 30
      }).addTo(this.map);
    }

    this.updateRectangle();
    this.boundServiceService.boundsUpdate.subscribe(() => this.updateRectangle());
  }

  updateRectangle() {
    if (this.rectangle) {
      this.rectangle.setBounds(this.boundServiceService.getBounds());
    } else {
      this.rectangle = this.boundServiceService.getRectangle().addTo(this.map);
    }
    this.map.fitBounds(this.rectangle.getBounds());
  }

  updateMarker() {
    if (this.meMarker) {
      this.meMarker.setLatLng([this.latitude, this.longitude]);
    } else {
      this.meMarker = new Marker([this.latitude, this.longitude], {
        icon: new Icon({
          iconUrl: 'assets/icon/favicon.png',
          iconSize: [64, 64]
        })
      }).addTo(this.map);
    }
  }

}
