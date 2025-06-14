import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA, effect, inject,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginDomainForm, LoginForm, LoginFormGroupModel} from '@tfm-angular/login/domain';
import {LOGIN_FORM_MODEL} from '../../../util';
import "@adrian_alonso/component-library/tfm-input"
import "@adrian_alonso/component-library/tfm-ribbon"
import "@adrian_alonso/component-library/tfm-link"
import "@adrian_alonso/component-library/tfm-input-email"
import {ControlValueAccessorDirective} from '@adrian_alonso/angular-utils-library';
import {TranslateModule, TranslatePipe} from '@ngx-translate/core';
import { RibbonStateEnum } from '@adrian_alonso/component-library/enums';
import { Router } from '@angular/router';
import {DomainRoutesEnum} from '@tfm-angular/shared/domain';

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

  public readonly router: Router = inject(Router)

  public readonly submit: OutputEmitterRef<LoginDomainForm>= output<LoginDomainForm>()
  public readonly loginFormModel: LoginFormGroupModel = LOGIN_FORM_MODEL;
  public readonly ribbonTypeEnum : typeof RibbonStateEnum = RibbonStateEnum;

  public showWarning: WritableSignal<boolean> = signal(false);
  public readonly form: WritableSignal<FormGroup<LoginForm>> = signal(this.generateForm());

  constructor() {
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

  public goToRegister(): void{
    this.router.navigate([DomainRoutesEnum.REGISTER]);
  }

  public submitForm(): void {
    this.submit.emit(this.form().value as LoginDomainForm)
  }

  public invalidSelected() : void{
    this.showWarning.set(true);
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
