import { inject, Injectable} from '@angular/core';
import { DataAccessAbstractHttpService } from '@tfm-angular/shared/data-access';
import {catchError, Observable, of, switchMap} from 'rxjs';
import { Router } from '@angular/router';
import { DomainRoutesEnum } from '@tfm-angular/shared/domain';
import {LoginDomainForm} from '@tfm-angular/login/domain';
import {RegisterDomainForm} from '@tfm-angular/register/domain';

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
    this.post<LoginDomainForm, { token: string }>('/login', loginCredentials).subscribe({
      next: (response: { token: string }) => {
          this.setAuthorization(response.token);
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

  public register(registerCredentials: RegisterDomainForm):void  {
    if(this.isAuthenticated()){
      //
    }
    this.post<RegisterDomainForm, any>('/register', registerCredentials).pipe(
      switchMap(() => {
        const loginCredentials: LoginDomainForm = {
          email: registerCredentials.email,
          password: registerCredentials.password
        };
        return this.post<LoginDomainForm, { token: string }>('/login', loginCredentials);
      })
    ).subscribe({
      next: (response: { token: string }) => {
        this.setAuthorization(response.token);
        this.router.navigateByUrl(DomainRoutesEnum.PROFILE);
      },
      error: () => {
        alert('Credenciales erroneas');
      },
      complete: () => {
        console.log('Registro y autenticación completados');
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

  private setAuthorization(token: string){
    sessionStorage.setItem('authToken', token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  private removeToken(): void {
    sessionStorage.removeItem('authToken');
  }

  public logout(): void{
    this.removeToken();
    this.router.navigateByUrl(DomainRoutesEnum.LOGIN);
  }

  public isAuthenticated(){
    return !!this.getToken();
  }

}
