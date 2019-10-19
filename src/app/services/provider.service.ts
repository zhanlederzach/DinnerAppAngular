import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {Table} from '../models/Table';


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
}
