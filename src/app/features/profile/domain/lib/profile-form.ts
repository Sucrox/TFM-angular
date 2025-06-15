import {AbstractControl} from '@angular/forms';
import {FormInputInstance} from '@tfm-angular/shared/domain';


export type ProfileForm = {
  [K in keyof Partial<ProfileDomainForm>]: AbstractControl<ProfileDomainForm[K]| null>
}

export interface ProfileDomainForm{
  email: string;
  firstName: string;
  familyName: string;
  dni: string;
  phone: string;
}

export interface ProfileFormGroupModel{
  email: FormInputInstance;
  firstName: FormInputInstance;
  familyName: FormInputInstance;
  dni: FormInputInstance;
  phone: FormInputInstance;
}

