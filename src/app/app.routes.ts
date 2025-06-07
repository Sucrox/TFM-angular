import { Routes } from '@angular/router';
import {DomainRoutesEnum} from '@tfm-angular/shared/domain';

export const routes: Routes = [
  {
    path: DomainRoutesEnum.PROFILE,
    loadComponent: () => import('./features/profile/profile.component').then(
      (m)=> m.ProfileComponent),
    title: 'Profile',
  },
  {
    path: DomainRoutesEnum.LOGIN,
    loadComponent: () => import('./features/login/login.component').then(
      (m)=> m.LoginComponent),
    title: 'Play',
  },
  {
    path: '**',
    redirectTo: DomainRoutesEnum.PROFILE,
    pathMatch: 'full'
  }
];
