import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {inject} from '@angular/core';
import {DataAccessAuthService} from './auth.service';

export function headerInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService: DataAccessAuthService = inject(DataAccessAuthService);
  if(authService.isAuthenticated()){
    return next(req.clone({
      setHeaders: {
        'Authorization': authService.getToken() ?? '',
      }
    }));
  }
  return next(req);
}
