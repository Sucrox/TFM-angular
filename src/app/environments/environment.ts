import pkg from '../../../package.json';
import {DomainRoutesEnum} from '@tfm-angular/shared/domain';
import {IconEnum} from '@adrian_alonso/component-library/enums';

export const environment = {
  production: false,
  NAME: pkg.name,
  VERSION: pkg.version,
  backendUrl: 'http://localhost:8081',
  routes: [
    {
      text: 'Products',
      route: DomainRoutesEnum.PRODUCTS,
      icon: IconEnum.SELECT_FILL
    },
    {
      text: 'Shopping Cart',
      route: DomainRoutesEnum.SHOPPING_CART,
      icon: IconEnum.CREDIT_CARD_FILL
      }
  ],
}
