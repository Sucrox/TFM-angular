import { inject, Injectable} from '@angular/core';
import { DataAccessAbstractHttpService } from '@tfm-angular/shared/data-access';
import {catchError, Observable, of, switchMap, tap, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { DomainRoutesEnum } from '@tfm-angular/shared/domain';
import {LoginDomainForm} from '@tfm-angular/login/domain';
import {RegisterDomainForm} from '@tfm-angular/register/domain';
import {LoginResponseInterface} from '../../../domain/lib/interfaces/login-response.interface';
import {AppStore} from '../store/app.store';

@Injectable({
  providedIn:'root'
})

export class DataAccessAuthService extends DataAccessAbstractHttpService {

  protected override basePath: string = 'users';

  private readonly router: Router = inject(Router);

  private readonly state = inject(AppStore);


  public login(loginCredentials: LoginDomainForm): Observable<LoginResponseInterface> { return this.post<LoginDomainForm, LoginResponseInterface>('/login', loginCredentials).pipe(
    tap((response: LoginResponseInterface) => {
      this.setAuthorization(response.token);

      this.state.updateUser({
        phone: response.phone,
      });

      this.router.navigateByUrl(DomainRoutesEnum.PROFILE);
      console.log('Autenticación completada');
    }),
    catchError((error) => {
      alert('Credenciales erróneas');
      return throwError(() => error);
    })
  );
  }

  public register(registerCredentials: RegisterDomainForm): void {
    if (this.isAuthenticated()) {
      return;
    }

    this.post<RegisterDomainForm, any>('/register', registerCredentials).pipe(
      switchMap(() => {
        const loginCredentials: LoginDomainForm = {
          email: registerCredentials.email,
          password: registerCredentials.password,
        };
        return this.login(loginCredentials);
      })
    ).subscribe({
      next: () => {
        console.log('Registro y autenticación completados');
      },
      error: () => {
        alert('Error en el registro o autenticación');
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

  public isAuthenticated(): boolean{
    return !!this.getToken();
  }

}
