import {Route} from '@angular/router';

import {ProductDomainRoutesEnum} from './domain/lib/routes.enum';

export const productsRoutes: Route[] = [
  {
    path: ProductDomainRoutesEnum.LIST,
    loadComponent: () => import('./products.component').then(
      (m)=> m.ProductsComponent),
    pathMatch: 'full'
  },
  {
    path: ':id',
    loadComponent: () => import('./features/product-detail/product-detail.component').then(
      (m)=> m.ProductDetailComponent),
  },
]
