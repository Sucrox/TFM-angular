import {IconEnum} from '@adrian_alonso/component-library/enums';

export interface Img<T = string | IconEnum> {
  src: T;
  alt: string
}
