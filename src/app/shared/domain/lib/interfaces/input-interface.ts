import {IconEnum, InputStatusEnum} from '@adrian_alonso/component-library/enums';
import {InputTypeEnum} from '../enums/input-type.enum';
export interface FormInputInstance<T = unknown> {
  type? : InputTypeEnum;
  name: string;
  label: string;
  size?: string;
  placeholder?: string;
  required?: boolean;
  fieldState?: InputStatusEnum;
  rightIcon?: IconEnum;
  leftIcon?: IconEnum;
  options?: Selection[];
}
