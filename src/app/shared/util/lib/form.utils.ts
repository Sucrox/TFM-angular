import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export class FormValidationUtils {
  public static readonly dniRegex: RegExp = /^[XYZ]?\d{5,8}[A-Z]$/;

  public static samePasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;

      if (!password || !confirmPassword) {
        return null;
      }

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  public static inputPhoneRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue= control.value;
      if(controlValue) {
        const phoneParts = controlValue.split(' ');
        if (phoneParts.length === 1){
          return {required: true}
        }
        else if( phoneParts.length === 2 && phoneParts[1].length != 9){
          return { pattern: true}
        }
      }
      return null;
    }
  }

}
