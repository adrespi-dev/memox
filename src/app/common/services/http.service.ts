import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import CustomStore from 'devextreme/data/custom_store';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAccessTokenHeader(): HttpHeaders {
    const accessToken = localStorage.getItem('accessToken');
    const token =  'Bearer ' + accessToken;
    const headers = new HttpHeaders()
    .set('Authorization', token);
    return headers;
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }


  getWebApiDataSource(url: string): CustomStore {
    const serviceUrl = environment.rootUrl + url;
    const store =  createStore({
      key: 'id',
      loadUrl: serviceUrl,
      insertUrl: serviceUrl,
      updateUrl: serviceUrl,
      deleteUrl: serviceUrl,
      onBeforeSend: (xhr, options) => {
        options.headers  = {'Authorization': 'Basic ' + this.getAccessToken()};
      },
    });
    store.on('loaded', (e) => {
    });
    return store;
  }

  postWithoutCredentials(url: string, values: any) {
    return this.http.post(environment.rootUrl + url, values)
    .pipe(catchError(err => { throw new Error(this.errorHandler(err)); } ));
  }

  get(url: string, params?: any) {
    const headers = this.getAccessTokenHeader();
    return this.http.get<any>(environment.rootUrl + url, {headers: headers, params: params})
                    .pipe(catchError(err => { throw new Error(this.errorHandler(err)); } ));
  }

  post(url: string, values: any) {
    const headers = this.getAccessTokenHeader();
    return this.http.post(environment.rootUrl + url, values, {headers: headers})
    .pipe(catchError(err => { throw new Error(this.errorHandler(err)); } ));
  }

  patch(url: string, values: any) {
    const headers = this.getAccessTokenHeader();
    return this.http.patch(environment.rootUrl + url, values, {headers: headers})
    .pipe(catchError(err => { throw new Error(this.errorHandler(err)); } ));
  }

  postOrPatch(url: string, values: any) {
    const id = values.id;
    if (id && id > 0) {
      return this.patch(url + '/' + id, values);
    } else {
      return this.post(url, values);
    }
  }

  delete(url: string) {
    const headers = this.getAccessTokenHeader();
    return this.http.delete(environment.rootUrl + url, {headers: headers})
    .pipe(catchError(err => { throw new Error(this.errorHandler(err)); } ));
  }

  errorHandler(error: any): string {
    console.log(error);
    const defaultMsg = 'Error en el servidor';
    if (typeof error.error === 'string' || error.error instanceof String) {
      return error.error || defaultMsg;
    }
    return defaultMsg;
  }

}
