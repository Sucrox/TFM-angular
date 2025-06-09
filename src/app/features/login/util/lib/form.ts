import {DebtorFormEnum, LoginFormGroupModel} from '@tfm-angular/login/domain';

export const LOGIN_FORM_MODEL: LoginFormGroupModel= {
  email: {
    type: DebtorFormEnum.TEXT,
    name: 'email',
    label: '',
    placeholder: '',
    required: true
  },
  password: {
    type: DebtorFormEnum.TEXT,
    name: 'email',
    label: '',
    placeholder: '',
    required: true
  },
}
