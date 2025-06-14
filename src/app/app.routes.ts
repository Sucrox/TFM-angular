import { Routes } from '@angular/router';
import { DomainRoutesEnum } from '@tfm-angular/shared/domain';
import { authGuard } from './shared/util/lib/guards/auth.guard';

export const routes: Routes = [
  {
    path: DomainRoutesEnum.PROFILE,
    loadComponent: () => import('./features/profile/profile.component').then(
      (m)=> m.ProfileComponent),
    title: 'Profile',
    canActivate: [authGuard]
  },
  {
    path: DomainRoutesEnum.LOGIN,
    loadComponent: () => import('./features/login/login.component').then(
      (m)=> m.LoginComponent),
    title: 'Login',
  },
  {
    path: DomainRoutesEnum.REGISTER,
    loadComponent: () => import('./features/register/register.component').then(
      (m)=> m.RegisterComponent),
    title: 'Register',
  },
  {
    path: '**',
    redirectTo: DomainRoutesEnum.PROFILE,
    pathMatch: 'full'
  }
];
