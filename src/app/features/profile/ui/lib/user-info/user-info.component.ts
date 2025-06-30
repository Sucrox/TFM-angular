import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserInfo} from '@tfm-angular/shared/domain';
import {ProfileForm, ProfileFormGroupModel, UpdateProfile} from '@tfm-angular/profile/domain';
import {ControlValueAccessorDirective} from '@adrian_alonso/angular-utils-library';
import {TranslatePipe} from '@ngx-translate/core';
import {PROFILE_FORM_MODEL} from '../../../util/lib/form';
import {DataAccessAuthService} from '@tfm-angular/shared/data-access';
import "@adrian_alonso/component-library/tfm-button"
import "@adrian_alonso/component-library/tfm-input"
import "@adrian_alonso/component-library/tfm-input-email"
import "@adrian_alonso/component-library/tfm-input-phone"
import {ButtonType, CountryPrefixEnum} from '@adrian_alonso/component-library/enums';

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

  public prefix: Signal<CountryPrefixEnum> = computed(() => {
    const rawPrefix = this.userInfo().phone.split(' ')[0].replace('+', '');
    const entries = Object.entries(CountryPrefixEnum) as [keyof typeof CountryPrefixEnum, string][];
    const match = entries.find(([_, value]) => value === rawPrefix);
    return match ? CountryPrefixEnum[match[0]] : CountryPrefixEnum.ES;
  });
  public readonly profileFormModel: ProfileFormGroupModel = PROFILE_FORM_MODEL;
  public readonly ButtonTypeEnum : typeof ButtonType = ButtonType;

  public checkValue(): boolean {
    const fieldsToCheck: (keyof UserInfo)[] = ['firstName', 'familyName'];

    const isUnchanged = fieldsToCheck.every((key) => {
      return this.form().value[key] === this.userInfo()[key];
    });
    const isInvalid = !this.form().valid;
    const isPristine = this.form().pristine;

    return isInvalid || isPristine || isUnchanged;
  }

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
      console.log({userdatsa: this.prefix()})
      this.form().patchValue({
        ...this.userInfo(),
        phone: this.userInfo().phone.split(' ')[1]
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
