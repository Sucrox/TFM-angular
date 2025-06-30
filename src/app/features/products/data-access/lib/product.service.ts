import {Injectable} from '@angular/core';
import {DataAccessAbstractHttpService} from '@tfm-angular/shared/data-access';
import {Observable} from 'rxjs';

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
