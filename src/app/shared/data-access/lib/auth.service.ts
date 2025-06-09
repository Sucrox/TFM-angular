import { inject, Injectable} from '@angular/core';
import { DataAccessAbstractHttpService } from '@tfm-angular/shared/data-access';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { DomainRoutesEnum } from '@tfm-angular/shared/domain';
import {resolve} from '@angular/compiler-cli';
import {LoginDomainForm} from '@tfm-angular/login/domain';

@Injectable({
  providedIn:'root'
})

export class DataAccessAuthService extends DataAccessAbstractHttpService {

  protected override basePath: string = 'users';

  private readonly router: Router = inject(Router);

  public login(loginCredentials: LoginDomainForm):void  {
    if(this.isAuthenticated()){
      //
    }
    this.post<LoginDomainForm,string>('/login', loginCredentials).subscribe({
        next: (token: string) => {
          this.setAuthorization(token);
          this.router.navigateByUrl(DomainRoutesEnum.PROFILE);
        },
        error: () => {
          alert('Credenciales erroneas');
        },
        complete: () => {
          console.log('Autenticación completada');
        }
      });
  }

  public checkUserName(username:string):Observable<any> {
    return this.get(`/${username}`).pipe(
      catchError((error: any) => {
        return of(error)
      })
    );
  }

  public setAuthorization(token: string){
    this.storeToken(token);
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
