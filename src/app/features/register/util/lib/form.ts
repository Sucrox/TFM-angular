import {RegisterFormGroupModel} from '../../domain';
import {InputTypeEnum} from '../../../../shared/domain/lib/enums/input-type.enum';

export const REGISTER_FORM_MODEL: RegisterFormGroupModel = {
  email: {
    type: InputTypeEnum.TEXT,
    name: 'email',
    label: 'register.registerForm.email.label',
    placeholder: 'register.registerForm.email.placeholder',
    size: 'size-50',
    required: true
  },
  password: {
    type: InputTypeEnum.TEXT,
    name: 'password',
    label: 'register.registerForm.password.label',
    placeholder: 'register.registerForm.password.placeholder',
    size: 'size-50',
    required: true
  },
  confirmPassword: {
    type: InputTypeEnum.TEXT,
    name: 'confirmPassword',
    label: 'register.registerForm.confirmPassword.label',
    placeholder: 'register.registerForm.confirmPassword.placeholder',
    size: 'size-50',
    required: true
  },
  firstName: {
    type: InputTypeEnum.TEXT,
    name: 'firstName',
    label: 'register.registerForm.firstName.label',
    placeholder: 'register.registerForm.firstName.placeholder',
    size: 'size-30',
    required: true
  },
  familyName: {
    type: InputTypeEnum.TEXT,
    name: 'familyName',
    label: 'register.registerForm.familyName.label',
    placeholder: 'register.registerForm.familyName.placeholder',
    size: 'size-30',
    required: true
  },
  dni: {
    type: InputTypeEnum.TEXT,
    name: 'dni',
    label: 'register.registerForm.dni.label',
    placeholder: 'register.registerForm.dni.placeholder',
    size: 'size-30',
    required: true
  },
  phone: {
    type: InputTypeEnum.TEXT,
    name: 'phone',
    label: 'register.registerForm.phone.label',
    placeholder: 'register.registerForm.phone.placeholder',
    size: 'size-50',
    required: true
  }
};
