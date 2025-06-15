import {InputTypeEnum} from '../../../../shared/domain/lib/enums/input-type.enum';
import {ProfileFormGroupModel} from '../../domain/lib/profile-form';
import {InputStatusEnum} from '@adrian_alonso/component-library/enums';

export const PROFILE_FORM_MODEL: ProfileFormGroupModel = {
  email: {
    type: InputTypeEnum.TEXT,
    name: 'email',
    label: 'form.email.label',
    placeholder: 'form.email.placeholder',
    size: 'size-100',
    required: true,
    fieldState: InputStatusEnum.DISABLED,
  },
  firstName: {
    type: InputTypeEnum.TEXT,
    name: 'firstName',
    label: 'form.firstName.label',
    placeholder: 'form.firstName.placeholder',
    size: 'size-50',
    required: true
  },
  familyName: {
    type: InputTypeEnum.TEXT,
    name: 'familyName',
    label: 'form.familyName.label',
    placeholder: 'form.familyName.placeholder',
    size: 'size-50',
    required: true
  },
  dni: {
    type: InputTypeEnum.TEXT,
    name: 'dni',
    label: 'form.dni.label',
    placeholder: 'form.dni.placeholder',
    size: 'size-50',
    required: true,
    fieldState: InputStatusEnum.DISABLED,
  },
  phone: {
    type: InputTypeEnum.TEXT,
    name: 'phone',
    label: 'form.phone.label',
    placeholder: 'form.phone.placeholder',
    required: true,
    size: 'size-50',
    fieldState: InputStatusEnum.DISABLED,
  }
};
