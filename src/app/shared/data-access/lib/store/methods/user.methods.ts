import {patchState} from '@ngrx/signals';
import {AppState, UserState,} from '../app.store';
import {Observable, tap} from 'rxjs';
import {UtilUserService} from '../../../../util/lib/services/user/user.service';
import {inject} from '@angular/core';

export default (
  store: any,
  userService: UtilUserService = inject(UtilUserService)) => ({

  updateUser(user: UserState | null): void {
    patchState(store, (state: AppState) => ({
      user: user ? { ...(state.user || {}), ...user } : null,
    }));
  },

  fetchUser(): Observable<any> {
    const phone = store.user()?.phone;
    return userService.loadUserInfo(phone).pipe(
      tap((response:any) => {
        this.updateUser(response.body);
      })
    )
  },
})

