import {RegisterFormGroupModel} from '../../domain';
import {InputTypeEnum} from '../../../../shared/domain/lib/enums/input-type.enum';

export const REGISTER_FORM_MODEL: RegisterFormGroupModel = {
  email: {
    type: InputTypeEnum.TEXT,
    name: 'email',
    label: 'form.email.label',
    placeholder: 'form.email.placeholder',
    size: 'size-50',
    required: true
  },
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
  firstName: {
    type: InputTypeEnum.TEXT,
    name: 'firstName',
    label: 'form.firstName.label',
    placeholder: 'form.firstName.placeholder',
    size: 'size-30',
    required: true
  },
  familyName: {
    type: InputTypeEnum.TEXT,
    name: 'familyName',
    label: 'form.familyName.label',
    placeholder: 'form.familyName.placeholder',
    size: 'size-30',
    required: true
  },
  dni: {
    type: InputTypeEnum.TEXT,
    name: 'dni',
    label: 'form.dni.label',
    placeholder: 'form.dni.placeholder',
    size: 'size-30',
    required: true
  },
  phone: {
    type: InputTypeEnum.TEXT,
    name: 'phone',
    label: 'form.phone.label',
    placeholder: 'form.phone.placeholder',
    size: 'size-50',
    required: true
  }
};
