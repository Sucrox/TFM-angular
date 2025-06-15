import { Injectable } from '@angular/core';
import {DataAccessAbstractHttpService} from '@tfm-angular/shared/data-access';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilUserService extends DataAccessAbstractHttpService{

  protected override basePath : string ='users'

  constructor() {
    super();
  }

  public loadUserInfo(phone: string): Observable<any>{
    return this.get<any>(`/${phone}`);
  }

}
