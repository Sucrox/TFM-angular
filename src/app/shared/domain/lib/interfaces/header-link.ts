import {DomainRoutesEnum} from '@tfm-angular/shared/domain';
import {IconEnum} from '@adrian_alonso/component-library/enums';

export interface HeaderLink {
  text: string;
  route: DomainRoutesEnum,
  icon: IconEnum
}
