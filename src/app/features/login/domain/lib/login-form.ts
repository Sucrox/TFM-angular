import {AbstractControl} from '@angular/forms';
import {IconEnum, InputStatusEnum} from '@adrian_alonso/component-library/enums';

export enum DebtorFormEnum{
  TEXT= 'text',
  NUMBER='number'
}

export type LoginForm= {
  [K in keyof Partial<LoginDomainForm>]: AbstractControl<LoginDomainForm[K]| null>
}

export interface FormInputInstance<T = unknown> {
  type? : DebtorFormEnum;
  name: string;
  label: string;
  formatDate?: string;
  placeholder?: string;
  required?: boolean;
  fieldState?: InputStatusEnum;
  rightIcon?: IconEnum;
  leftIcon?: IconEnum;
  options?: Selection[];
  isDatePicker?: boolean;
}
export interface LoginDomainForm{
  email: string;
  password: string;
}

export interface LoginFormGroupModel{
  email: FormInputInstance;
  password: FormInputInstance;
}

