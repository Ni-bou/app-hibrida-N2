import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APImeteoSourcePage } from './apimeteo-source.page';

const routes: Routes = [
  {
    path: '',
    component: APImeteoSourcePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class APImeteoSourcePageRoutingModule {}
