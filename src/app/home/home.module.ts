import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
