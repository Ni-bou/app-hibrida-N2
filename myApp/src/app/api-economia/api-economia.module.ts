import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApiEconomiaPageRoutingModule } from './api-economia-routing.module';

import { ApiEconomiaPage } from './api-economia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiEconomiaPageRoutingModule
  ],
  declarations: [ApiEconomiaPage]
})
export class ApiEconomiaPageModule {}
