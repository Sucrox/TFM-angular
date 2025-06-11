import {LoginFormGroupModel} from '@tfm-angular/login/domain';
import {InputTypeEnum} from '../../../../shared/domain/lib/enums/input-type.enum';

export const LOGIN_FORM_MODEL: LoginFormGroupModel= {
  email: {
    type: InputTypeEnum.TEXT,
    name: 'email',
    label: 'login.loginForm.email.label',
    placeholder: 'login.loginForm.email.placeholder',
    required: true
  },
  password: {
    type: InputTypeEnum.TEXT,
    name: 'password',
    label: 'login.loginForm.password.label',
    placeholder: 'login.loginForm.password.label',
    required: true
  },
}
