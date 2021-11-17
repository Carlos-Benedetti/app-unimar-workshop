import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TileLayer, Map, Marker, Icon } from 'leaflet';
import { BoundServiceService } from 'src/app/services/bound-service.service';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UserPositionService } from 'src/app/services/user-position.service';
@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage {
  map: Map;
  latitude: number;
  longitude: number;
  meMarker: Marker<any>;

  get haveCoodenates(): boolean {
    return typeof this.latitude === 'number' && typeof this.longitude === 'number';
  }

  constructor(private boundServiceService: BoundServiceService, private userPositionService: UserPositionService) { }

  ionViewDidEnter(){
    this.leafletMap();
    this.userPositionService.watchPosition.subscribe(position => {
      this.latitude = position.latitude;
      this.longitude = position.longitude;
      this.updateMarker();
    });
  };

  leafletMap() {
    this.map = new Map('configMapDiv').setView([environment.bottomLeft.latitude, environment.bottomLeft.longitude], 13);
    this.map.setMaxZoom(30);
    new TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Carlos Bene',
      maxNativeZoom:19,
      maxZoom:30
    }).addTo(this.map);

  }

  setBottomLeft() {
    this.boundServiceService.bottomLeft = { latitude: this.latitude, longitude: this.longitude };
  }
  setTopRight() {
    this.boundServiceService.topRight = { latitude: this.latitude, longitude: this.longitude };
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
