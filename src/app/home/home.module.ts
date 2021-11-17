import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
// import { NgxShowHidePasswordModule } from 'ngx-show-hide-password';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    // NgxLongPressModule,
    // NgxShowHidePasswordModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
