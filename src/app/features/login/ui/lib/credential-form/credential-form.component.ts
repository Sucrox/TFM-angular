import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginDomainForm, LoginForm, LoginFormGroupModel} from '@tfm-angular/login/domain';
import {LOGIN_FORM_MODEL} from '../../../util';
import "@adrian_alonso/component-library/tfm-input"
import {ControlValueAccessorDirective} from '@adrian_alonso/angular-utils-library';
import {TranslateModule, TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'login-credential-form',
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

  public readonly submit: OutputEmitterRef<LoginDomainForm>= output<LoginDomainForm>()
  public readonly loginFormModel: LoginFormGroupModel = LOGIN_FORM_MODEL;

  public readonly form: WritableSignal<FormGroup<LoginForm>> = signal(this.generateForm());

  public submitForm(): void {
    this.form().controls.email?.markAsTouched();
    this.form().controls.password?.markAsTouched();
    if(this.form().valid){
      this.submit.emit(this.form().value as LoginDomainForm)
    }
  }

  private generateForm(): FormGroup<LoginForm> {
    return new FormGroup<LoginForm>({
      email: new FormControl<string | null>(null, {
        validators: [Validators.email, Validators.required]
      }),
      password: new FormControl<string |null>(null, {
        validators: [Validators.required]
      }),
    })
  }
}
