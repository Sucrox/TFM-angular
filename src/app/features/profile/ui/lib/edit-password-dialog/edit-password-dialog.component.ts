import {Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, signal, WritableSignal} from '@angular/core';
import {UtilDialogService} from '../../../../../shared/util/lib/services/dialog/dialog.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PasswordForm, PasswordFormGroupModel} from '../../../domain/lib/password-form';
import {FormValidationUtils} from '@tfm-angular/shared/util';
import {ControlValueAccessorDirective} from '@adrian_alonso/angular-utils-library';
import {TranslatePipe} from '@ngx-translate/core';
import {PASSWORD_FORM_MODEL} from '../../../util/lib/password-form';
import {RibbonStateEnum} from '@adrian_alonso/component-library/enums';
import "@adrian_alonso/component-library/tfm-input"
import "@adrian_alonso/component-library/tfm-ribbon"
import "@adrian_alonso/component-library/tfm-button"

@Component({
  selector: 'profile-edit-password-dialog',
  imports: [
    ControlValueAccessorDirective,
    FormsModule,
    TranslatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './edit-password-dialog.component.html',
  standalone: true,
  styleUrl: './edit-password-dialog.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileUiEditPasswordDialogComponent {

  private readonly dialogService: UtilDialogService = inject(UtilDialogService);

  public readonly passwordFormModel: PasswordFormGroupModel = PASSWORD_FORM_MODEL;

  public showWarning: WritableSignal<boolean> = signal(false);
  public readonly passwordsDoNotMatch = computed(() => {
    const password = this.form().get('newPassword')?.value;
    const confirmPassword = this.form().get('confirmPassword')?.value;
    return password !== confirmPassword;
  });

  public readonly form: WritableSignal<FormGroup<PasswordForm>> = signal(this.generateForm());

  public cancel(): void {
    this.dialogService.close();
  }

  public submit(): void {
    this.dialogService.close(this.form().value);
  }

  public invalidSelected() : void{
    this.showWarning.set(true);
  }

  private generateForm(): FormGroup<PasswordForm> {
    return new FormGroup<PasswordForm>({
        password: new FormControl<string | null>(null, {
          validators: [Validators.required]
        }),
        newPassword : new FormControl<string | null>(null, {
          validators: [Validators.required]
        }),
        confirmPassword: new FormControl<string | null>(null, {
          validators: [Validators.required]
        })
      },
      {validators: FormValidationUtils.newPasswordValidator()
      });
  }

  protected readonly ribbonTypeEnum = RibbonStateEnum;
}
