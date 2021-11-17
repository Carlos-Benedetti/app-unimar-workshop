import { Component } from '@angular/core';
import { Geolocation, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { inRoom } from '../util/inBoundingBox';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private geolocation: Geolocation) {
    // ouvir por mudanças de posição
    const watch = this.geolocation.watchPosition({enableHighAccuracy:true});
    watch.subscribe((data) => {

      //se a posição for valida, verifica se ela esta dentro do perimetro
      if (this.isValidPosition(data)) {
        this.checkPosition(data);
      }
    });
  };

  checkPosition(position: Geoposition) {
    //verifica se esta no perimetro
    const inTheRoom = inRoom(
      position.coords.latitude,
      position.coords.longitude
    );

    //se estiver avise
    if (inTheRoom) {
      console.log('estou DENTRO do perimetro');
    }else{
      console.log('estou FORA do perimetro');
    }
  }

  //verifica se o dado retornada é um posição
  isValidPosition(data: Geoposition | PositionError): data is Geoposition {
    return 'coords' in data;
  }


}
