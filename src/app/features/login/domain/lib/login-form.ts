import {AbstractControl} from '@angular/forms';
import {FormInputInstance} from '@tfm-angular/shared/domain';


export type LoginForm= {
  [K in keyof Partial<LoginDomainForm>]: AbstractControl<LoginDomainForm[K]| null>
}

export interface LoginDomainForm{
  email: string;
  password: string;
}


export interface LoginFormGroupModel{
  email: FormInputInstance;
  password: FormInputInstance;
}

