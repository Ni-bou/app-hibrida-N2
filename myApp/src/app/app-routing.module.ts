import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registrarse',
    redirectTo: 'registrarse',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'menu/home',
    redirectTo: 'menu/home',
    pathMatch: 'full'
  },
  {
    path: 'menu/historial',
    redirectTo: 'menu/historial',
    pathMatch: 'full'
  },
  {
    path: 'menu/perfil',
    redirectTo: 'menu/perfil',
    pathMatch: 'full'
  },
  {
    path: 'menu/map',
    redirectTo: 'menu/map',
    pathMatch: 'full'
  },
  {
    path: 'menu/camera',
    redirectTo: 'menu/camera',
    pathMatch: 'full'
  },
  {
    path: 'menu/api-economia',
    redirectTo: 'menu/api-economia',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule),
    //canActivate: [authGuard]
    
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
 
 
  {
    path: 'e404',
    loadChildren: () => import('./e404/e404.module').then( m => m.E404PageModule)
  },

  

  
  /* 
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
   {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'api-economia',
    loadChildren: () => import('./api-economia/api-economia.module').then( m => m.ApiEconomiaPageModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule)
  },**/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
