import {inject, Injectable} from '@angular/core';
import {AppStore, DataAccessAbstractHttpService} from '@tfm-angular/shared/data-access';
import {Observable, tap} from 'rxjs';
import {UpdateProfile} from '../../domain/lib/profile.interface';
import {UserInterface} from '../../../../shared/domain/lib/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends DataAccessAbstractHttpService{

  private readonly state = inject(AppStore);


  protected override basePath : string ='users'

  constructor() {
    super();
  }
  public updateUserProfile(phone: string, updateUser: UpdateProfile): Observable<UserInterface>{
    return this.patch<UpdateProfile, UserInterface>(`/${phone}`, updateUser).pipe(
      tap((response: UserInterface) => {
        this.state.updateUser(response);
      })
    );
  }
}
