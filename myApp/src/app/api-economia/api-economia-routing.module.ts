import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiEconomiaPage } from './api-economia.page';

const routes: Routes = [
  {
    path: '',
    component: ApiEconomiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiEconomiaPageRoutingModule {}
