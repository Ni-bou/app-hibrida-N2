import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';


const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children:[
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'historial',
        loadChildren: () => import('../historial/historial.module').then( m => m.HistorialPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('../map/map.module').then( m => m.MapPageModule)
      },
      {
        path: 'api-economia',
        loadChildren: () => import('../api-economia/api-economia.module').then( m => m.ApiEconomiaPageModule)
      },
      {
        path: 'camera',
        loadChildren: () => import('../camera/camera.module').then( m => m.CameraPageModule)
      },
      {
        path: 'apimeteo-source',
        loadChildren: () => import('../apimeteo-source/apimeteo-source.module').then( m =>m.APImeteoSourcePageModule)
      },
      {
        path: '',
        redirectTo: 'home',                  
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
