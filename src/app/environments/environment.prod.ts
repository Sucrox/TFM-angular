import pkg from '../../../package.json';
import {DomainRoutesEnum} from '@tfm-angular/shared/domain';
import {IconEnum} from '@adrian_alonso/component-library/enums';

export const environment = {
  production: false,
  NAME: pkg.name,
  VERSION: pkg.version,
  backendUrl: 'https://tfm-spring.onrender.com',
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
