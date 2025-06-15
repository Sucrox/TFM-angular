import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  input,
  InputSignal, output, OutputEmitterRef,
  signal,
  WritableSignal
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserInfo} from '../../../../../shared/domain/lib/interfaces/user.interface';
import {ProfileDomainForm, ProfileForm, ProfileFormGroupModel} from '../../../domain/lib/profile-form';
import {ControlValueAccessorDirective} from '@adrian_alonso/angular-utils-library';
import {TranslatePipe} from '@ngx-translate/core';
import {PROFILE_FORM_MODEL} from '../../../util/lib/form';
import {DataAccessAuthService} from '@tfm-angular/shared/data-access';
import "@adrian_alonso/component-library/tfm-button"
import "@adrian_alonso/component-library/tfm-input"
import "@adrian_alonso/component-library/tfm-input-email"
import "@adrian_alonso/component-library/tfm-input-phone"
import {ButtonType} from '@adrian_alonso/component-library/enums';
import {UpdateProfile} from '../../../domain/lib/profile.interface';

@Component({
  selector: 'profile-user-info',
  imports: [ReactiveFormsModule, ControlValueAccessorDirective, TranslatePipe],
  standalone: true,
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileUiUserInfoComponent {

  private readonly authService: DataAccessAuthService = inject(DataAccessAuthService)

  public readonly submit: OutputEmitterRef<UpdateProfile>= output<UpdateProfile>();

  public readonly form: WritableSignal<FormGroup<ProfileForm>> = signal(this.generateForm());
  public userInfo: InputSignal<UserInfo> = input.required<UserInfo>();

  public readonly profileFormModel: ProfileFormGroupModel = PROFILE_FORM_MODEL;
  public readonly ButtonTypeEnum : typeof ButtonType = ButtonType;



  private generateForm(): FormGroup<ProfileForm> {
    return new FormGroup<ProfileForm>({
        email: new FormControl<string | null>(null, {}),
        firstName: new FormControl<string | null>(null, {
          validators: [Validators.required]
        }),
        familyName: new FormControl<string | null>(null, {
          validators: [Validators.required]
        }),
        dni: new FormControl<string | null>(null, {}),
        phone: new FormControl<string | null>(null, {})
      });
  }

  constructor(
  ) {
    effect(() => {
      console.log({userdata: this.userInfo()})
      this.form().patchValue({
        email: this.userInfo().email,
        firstName: this.userInfo().firstName,
        familyName: this.userInfo().familyName,
        phone: this.userInfo().phone,
        dni: this.userInfo().dni,
      })
    });
  }

  public updateProfile():void{
    const { firstName, familyName } = this.form().value;
    this.submit.emit({ firstName, familyName } as UpdateProfile);  }

  public logout(): void{
    this.authService.logout();
  }

}
