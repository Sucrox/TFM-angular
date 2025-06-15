import {Component, input, InputSignal, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserInterface} from '../../../../../shared/domain/lib/interfaces/user.interface';
import {FormValidationUtils} from '@tfm-angular/shared/util';
import {ProfileForm} from '../../../domain/lib/profile-form';

@Component({
  selector: 'app-user-info',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class ProfileUiUserInfoComponent {

  public userInfo: InputSignal<UserInterface> = input.required<UserInterface>();

  public readonly form: WritableSignal<FormGroup<ProfileForm>> = signal(this.generateForm());


  private generateForm(): FormGroup<ProfileForm> {
    return new FormGroup<ProfileForm>({
        email: new FormControl<string | null>(null, {
          validators: [Validators.email, Validators.required]
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
      });
  }
}
