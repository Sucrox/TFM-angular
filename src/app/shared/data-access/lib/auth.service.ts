import { inject, Injectable} from '@angular/core';
import { DataAccessAbstractHttpService } from '@tfm-angular/shared/data-access';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { DomainRoutesEnum } from '@tfm-angular/shared/domain';

@Injectable({
  providedIn:'root'
})

export class DataAccessAuthService extends DataAccessAbstractHttpService {

  protected override basePath: string = 'users';

  private readonly router: Router = inject(Router);

  public login(username:string, password:string):Observable<any> {
    return this.get('/login', {username,password});
  }

  public checkUserName(username:string):Observable<any> {
    return this.get(`/${username}`).pipe(
      catchError((error: any) => {
        return of(error)
      })
    );
  }

  public setAuthorization(token: any){
    if (token && token.startsWith('Bearer ')) {
      this.storeToken(token);
    }
  }

  private storeToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  private removeToken(): void {
    sessionStorage.removeItem('authToken');
  }

  public storeUser(username: string): void {
    sessionStorage.setItem('user', username);
  }


  public logout(): void{
    this.removeToken();
    this.router.navigateByUrl(DomainRoutesEnum.LOGIN);
  }

  public isAuthenticated(){
    return !!this.getToken();
  }

}
