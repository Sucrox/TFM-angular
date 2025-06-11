import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA, effect,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import "@adrian_alonso/component-library/tfm-input"
import "@adrian_alonso/component-library/tfm-ribbon"
import "@adrian_alonso/component-library/tfm-input-phone"
import "@adrian_alonso/component-library/tfm-input-email"
import { ControlValueAccessorDirective} from '@adrian_alonso/angular-utils-library';
import { TranslateModule, TranslatePipe} from '@ngx-translate/core';
import { RibbonStateEnum } from '@adrian_alonso/component-library/enums';
import { REGISTER_FORM_MODEL} from '../../../util';
import { RegisterDomainForm, RegisterForm, RegisterFormGroupModel} from '../../../domain';
import {FormValidationUtils} from '@tfm-angular/shared/util';

@Component({
  selector: 'register-credential-form',
  imports: [
    ReactiveFormsModule,
    ControlValueAccessorDirective,
    TranslateModule,
    TranslatePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './credential-form.component.html',
  styleUrl: './credential-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class CredentialFormComponent {

  public readonly submit: OutputEmitterRef<RegisterDomainForm>= output<RegisterDomainForm>()
  public readonly registerFormModel: RegisterFormGroupModel = REGISTER_FORM_MODEL;
  public readonly ribbonTypeEnum : typeof RibbonStateEnum = RibbonStateEnum;

  public showWarning: WritableSignal<boolean> = signal(false);
  public readonly form: WritableSignal<FormGroup<RegisterForm>> = signal(this.generateForm());

  constructor() {
    effect(() => {
      console.log(this.form().controls.phone)
    });

    effect(() => {
      if (this.showWarning()){
        Object.keys(this.form().controls).forEach(
          (field:string) => {
            const control = this.form().get(field)
            control!.markAsTouched();
            control?.updateValueAndValidity();
          }
        )
        this.form().markAllAsTouched();
        this.form().updateValueAndValidity();
      }
    })
  }

  public submitForm(): void {
    this.submit.emit(this.form().value as RegisterDomainForm)
  }

  public invalidSelected() : void{
    this.showWarning.set(true);
  }

  private generateForm(): FormGroup<RegisterForm> {
    return new FormGroup<RegisterForm>({
      email: new FormControl<string | null>(null, {
        validators: [Validators.email, Validators.required]
      }),
      password: new FormControl<string | null>(null, {
        validators: [Validators.required]
      }),
      confirmPassword: new FormControl<string | null>(null, {
        validators: [Validators.required]
      }),
      firstName: new FormControl<string | null>(null, {
        validators: [Validators.required]
      }),
      familyName: new FormControl<string | null>(null, {
        validators: [Validators.required]
      }),
      dni: new FormControl<string | null>(null, {
        validators: [Validators.required, Validators.pattern(FormValidationUtils.dniRegex)]
      }),
      phone: new FormControl<string | null>(null, {
        validators: [FormValidationUtils.inputPhoneRequiredValidator()]
      })
    },
    {validators: FormValidationUtils.samePasswordValidator()
    });
  }
}
