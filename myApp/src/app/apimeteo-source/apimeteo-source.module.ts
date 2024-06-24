import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { APImeteoSourcePageRoutingModule } from './apimeteo-source-routing.module';

import { APImeteoSourcePage } from './apimeteo-source.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    APImeteoSourcePageRoutingModule
  ],
  declarations: [APImeteoSourcePage]
})
export class APImeteoSourcePageModule {}
