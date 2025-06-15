import {InputTypeEnum} from '../../../../shared/domain/lib/enums/input-type.enum';
import {PasswordFormGroupModel} from '../../domain/lib/password-form';

export const PASSWORD_FORM_MODEL: PasswordFormGroupModel = {

  password: {
    type: InputTypeEnum.PASSWORD,
    name: 'password',
    label: 'form.password.label',
    placeholder: 'form.password.placeholder',
    size: 'size-50',
    required: true
  },
  confirmPassword: {
    type: InputTypeEnum.PASSWORD,
    name: 'confirmPassword',
    label: 'form.confirmPassword.label',
    placeholder: 'form.confirmPassword.placeholder',
    size: 'size-50',
    required: true
  },
  newPassword: {
    type: InputTypeEnum.PASSWORD,
    name: 'newPassword',
    label: 'form.newPassword.label',
    placeholder: 'form.newPassword.placeholder',
    size: 'size-50',
    required: true
  }
};
