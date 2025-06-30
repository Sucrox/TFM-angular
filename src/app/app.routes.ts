import { Routes } from '@angular/router';
import { DomainRoutesEnum } from '@tfm-angular/shared/domain';
import { authGuard } from '@tfm-angular/shared/util';
import {loggedAuthGuard} from '@tfm-angular/shared/util';

export const routes: Routes = [
  {
    path: DomainRoutesEnum.PROFILE,
    loadComponent: () => import('./features/profile/profile.component').then(
      (m)=> m.ProfileComponent),
    title: 'Profile',
    canActivate: [authGuard]
  },
  {
    path: DomainRoutesEnum.PRODUCTS,
    loadComponent: () => import('./features/products/products.component').then(
      (m)=> m.ProductsComponent),
    title: 'Products',
    canActivate: [authGuard]
  },
  {
    path: DomainRoutesEnum.SHOPPING_CART,
    loadComponent: () => import('./features/shopping-cart/shopping-cart.component').then(
      (m)=> m.ShoppingCartComponent),
    title: 'ShoppingCart',
    canActivate: [authGuard]
  },
  {
    path: DomainRoutesEnum.LOGIN,
    loadComponent: () => import('./features/login/login.component').then(
      (m)=> m.LoginComponent),
    title: 'Login',
    canActivate: [loggedAuthGuard]

  },
  {
    path: DomainRoutesEnum.REGISTER,
    loadComponent: () => import('./features/register/register.component').then(
      (m)=> m.RegisterComponent),
    title: 'Register',
    canActivate: [loggedAuthGuard]
  },
  {
    path: '**',
    redirectTo: DomainRoutesEnum.PRODUCTS,
    pathMatch: 'full'
  }
];
