import {DomainRoutesEnum} from '@tfm-angular/shared/domain';

export interface HeaderLink {
  text: string;
  route: DomainRoutesEnum,
  icon: {
    src: string;
    alt: string;
  }
}
