import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments';


@Injectable({
  providedIn: "root"
})
export abstract class DataAccessAbstractHttpService {
  protected abstract basePath: string;
  protected baseHeaders: Record<string, string> = {};

  private httpClient: HttpClient= inject(HttpClient);

  protected post<T,R> (path: string, body: T, headers: Record<string, string> = {}, queryParams : Record<string, string> = {}): Observable<R>{
    return this.httpClient.post<R>(this.getEndpoint(path), body, {
      headers: {
        ...this.baseHeaders,
        ...headers
      },
      params: queryParams
    });
  }
  protected get<T> (path: string, queryParams : Record<string, string> = {}, headers: Record<string, string> = {}): Observable<HttpResponse<T>>{
    return this.httpClient.get<HttpResponse<T>>(this.getEndpoint(path), {
      params: queryParams,
      headers: {
        ...this.baseHeaders,
        ...headers
      },
      observe: 'response' as 'body'
    });
  };
  protected getWithHeaders<T> (path: string, queryParams : Record<string, string> = {}, headers: Record<string, string> = {}): Observable<T>{
    return this.httpClient.get<T>(this.getEndpoint(path), {
      params: queryParams,
      headers: {
        ...this.baseHeaders,
        ...headers
      },
      observe: 'response' as 'body'
    });
  };

  private getEndpoint(path: string) : string {
    let url: string = environment.backendUrl;
    return `${url}/${this.basePath}${path}`
  };

}
