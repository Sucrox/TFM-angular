import {DebtorFormEnum, LoginFormGroupModel} from '@tfm-angular/login/domain';

export const LOGIN_FORM_MODEL: LoginFormGroupModel= {
  email: {
    type: DebtorFormEnum.TEXT,
    name: 'email',
    label: 'login.loginForm.email.label',
    placeholder: 'login.loginForm.email.placeholder',
    required: true
  },
  password: {
    type: DebtorFormEnum.TEXT,
    name: 'password',
    label: 'login.loginForm.password.label',
    placeholder: 'login.loginForm.password.label',
    required: true
  },
}
