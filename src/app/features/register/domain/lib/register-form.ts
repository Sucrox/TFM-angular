import {AbstractControl} from '@angular/forms';
import {FormInputInstance} from '@tfm-angular/shared/domain';


export type RegisterForm = {
  [K in keyof Partial<RegisterDomainForm>]: AbstractControl<RegisterDomainForm[K]| null>
}

export interface RegisterDomainForm{
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  familyName: string;
  dni: string;
  phone: string;
}

export interface RegisterFormGroupModel{
  email: FormInputInstance;
  password: FormInputInstance;
  confirmPassword: FormInputInstance;
  firstName: FormInputInstance;
  familyName: FormInputInstance;
  dni: FormInputInstance;
  phone: FormInputInstance;
}

