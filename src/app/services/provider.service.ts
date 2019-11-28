import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {Table} from '../models/Table';
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ProviderService extends MainService {

  public sendMessage = new EventEmitter<string>();
  private urlRoot = 'http://localhost:3100';

  constructor(http: HttpClient) {
    super(http);
  }

  getTables(): Promise<Table[]> {
    return this.get(`${this.urlRoot}/tables`, {});
  }

  refreshToken() {
    return this.http.post<any>(`${this.urlRoot}/refresh/`, {
      refresh: this.getRefreshToken()
    }).pipe(tap((token: { access: string } ) => {
      this.storeJwtToken(token.access);
    }));
  }

  private getRefreshToken() {
    return localStorage.getItem('refresh');
  }

  storeJwtToken(jwt: string ) {
    localStorage.setItem('token', jwt);
  }
}
