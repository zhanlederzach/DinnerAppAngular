import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private subject = new Subject<string>();

  constructor() { }

  changeMessage(message: string) {
    console.log(message);
    this.subject.next(message)
  }

  getMessage(): Observable<string> {
    return this.subject.asObservable();
  }

}
