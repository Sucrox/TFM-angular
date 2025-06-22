import pkg from '../../../package.json';
import {DomainRoutesEnum} from '@tfm-angular/shared/domain';

export const environment = {
  production: false,
  NAME: pkg.name,
  VERSION: pkg.version,
  backendUrl: 'http://localhost:8081',
  routes: [
    {
      text: 'Products',
      route: DomainRoutesEnum.PRODUCTS,
      icon: {
        src: 'none',
        alt:'Products'
      }
    },
    {
      text: 'Shopping Cart',
      route: DomainRoutesEnum.SHOPPING_CART,
      icon: {
        src: 'none',
        alt:'Shopping cart'
      }
      }
  ],
}
