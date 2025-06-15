import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import "@adrian_alonso/component-library/tfm-button"
import "@adrian_alonso/component-library/tfm-link"
import {ProfileUserPictureComponent} from './ui/lib/user-picture/user-picture.component';
import {UserInfo} from '../../shared/domain/lib/interfaces/user.interface';
import {AppStore, DataAccessAuthService, UserState} from '@tfm-angular/shared/data-access';
import {UtilDialogService} from '../../shared/util/lib/services/dialog/dialog.service';
import {ProfileUiEditPasswordDialogComponent} from './ui/lib/edit-password-dialog/edit-password-dialog.component';
import {ProfileUiUserInfoComponent} from './ui/lib/user-info/user-info.component';
import {ProfileService} from './data-access/lib/profile.service';
import {UpdateProfile} from './domain/lib/profile.interface';

@Component({
  selector: 'app-profile',
  imports: [
    TranslatePipe,
    ProfileUserPictureComponent,
    ProfileUiUserInfoComponent,
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileComponent {

  public readonly state= inject(AppStore)
  private readonly dialogService: UtilDialogService= inject(UtilDialogService)
  private readonly authService: DataAccessAuthService= inject(DataAccessAuthService)
  private readonly profileService: ProfileService= inject(ProfileService)

  public userInfo: Signal<UserInfo> = computed( () =>
    ProfileComponent.userInfoMapper(this.state.user()));

  public propic: WritableSignal<string> = signal<string>(ProfileUserPictureComponent.propicPlaceholder)

  constructor() {
    effect(() => {
      const user = this.state.user();
      const phone = user?.phone;

      const isIncompleteUser =
        !user?.firstName ||
        !user?.familyName ||
        !user?.email ||
        !user?.dni;

      if (this.authService.isAuthenticated() && phone && isIncompleteUser) {
        this.state.fetchUser().subscribe();
      }
    });
  }

  public editPassword(): void {
    this.dialogService.open(ProfileUiEditPasswordDialogComponent,{
      title: 'Modify passsword'
    }).subscribe((response: any) => {
      if (response)
        console.log(response)
    })
  }

  public updateUserProfile(updatedProfile: UpdateProfile): void {
    this.profileService.updateUserProfile(this.userInfo().phone,updatedProfile).subscribe();
  }

  private static userInfoMapper(stateUser: UserState | null) : UserInfo{
    return {
      email: stateUser?.email ?? '',
      firstName: stateUser?.firstName ?? '',
      familyName: stateUser?.familyName ?? '',
      phone: stateUser?.phone ?? '',
      dni: stateUser?.dni ?? '',
    }
  }
}
