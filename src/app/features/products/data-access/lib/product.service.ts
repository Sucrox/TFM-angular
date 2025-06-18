import {inject, Injectable} from '@angular/core';
import {AppStore, DataAccessAbstractHttpService} from '@tfm-angular/shared/data-access';
import {UpdateProfile} from '../../../profile/domain/lib/profile.interface';
import {Observable, tap} from 'rxjs';
import {UserInterface} from '../../../../shared/domain/lib/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DataAccessAbstractHttpService{

  protected override basePath : string ='products';

  constructor() {
    super();
  }

  public getAllProducts(offset:number =0, limit:number = 5): Observable<any>{
    return this.get<any>(``,{
      offset: offset.toString(),
      limit: limit.toString(),
    }).pipe();
  }

}
