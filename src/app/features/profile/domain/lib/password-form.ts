import {AbstractControl} from '@angular/forms';
import {FormInputInstance} from '@tfm-angular/shared/domain';


export type PasswordForm = {
  [K in keyof Partial<PasswordDomainForm>]: AbstractControl<PasswordDomainForm[K]| null>
}

export interface PasswordDomainForm{
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordFormGroupModel{
  password: FormInputInstance;
  newPassword: FormInputInstance;
  confirmPassword: FormInputInstance;

}

