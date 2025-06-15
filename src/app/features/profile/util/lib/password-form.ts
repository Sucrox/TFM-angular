import {InputTypeEnum} from '../../../../shared/domain/lib/enums/input-type.enum';
import {PasswordFormGroupModel} from '../../domain/lib/password-form';

export const PASSWORD_FORM_MODEL: PasswordFormGroupModel = {

  password: {
    type: InputTypeEnum.PASSWORD,
    name: 'password',
    label: 'profile.passwordForm.password.label',
    placeholder: 'profile.passwordForm.password.placeholder',
    size: 'size-50',
    required: true
  },
  confirmPassword: {
    type: InputTypeEnum.PASSWORD,
    name: 'confirmPassword',
    label: 'profile.passwordForm.confirmPassword.label',
    placeholder: 'profile.passwordForm.confirmPassword.placeholder',
    size: 'size-50',
    required: true
  },
  newPassword: {
    type: InputTypeEnum.PASSWORD,
    name: 'newPassword',
    label: 'profile.passwordForm.newPassword.label',
    placeholder: 'profile.passwordForm.newPassword.placeholder',
    size: 'size-50',
    required: true
  }
};
