import {LoginFormGroupModel} from '@tfm-angular/login/domain';
import {InputTypeEnum} from '@tfm-angular/shared/domain';

export const LOGIN_FORM_MODEL: LoginFormGroupModel= {
  email: {
    type: InputTypeEnum.TEXT,
    name: 'email',
    label: 'form.email.label',
    placeholder: 'form.email.placeholder',
    required: true
  },
  password: {
    type: InputTypeEnum.PASSWORD,
    name: 'password',
    label: 'form.password.label',
    placeholder: 'form.password.label',
    required: true
  },
}
