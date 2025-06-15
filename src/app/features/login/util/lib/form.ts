import {LoginFormGroupModel} from '@tfm-angular/login/domain';
import {InputTypeEnum} from '../../../../shared/domain/lib/enums/input-type.enum';

export const LOGIN_FORM_MODEL: LoginFormGroupModel= {
  email: {
    type: InputTypeEnum.TEXT,
    name: 'email',
    label: 'form.email.label',
    placeholder: 'form.email.placeholder',
    required: true
  },
  password: {
    type: InputTypeEnum.TEXT,
    name: 'password',
    label: 'form.password.label',
    placeholder: 'form.password.label',
    required: true
  },
}
