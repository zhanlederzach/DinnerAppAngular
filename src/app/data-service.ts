import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Profile} from './models/Profile';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private subject = new BehaviorSubject<string>('');
  data = this.subject.asObservable();

  // private observable = new Observable<string>();
  private profile: Profile;
  private profiles: Profile[] = [{
    password: '1234qwer',
    email: 'zhanel@gmail.com',
    name: 'Zhanel',
  }];

  constructor() {
  }

  saveProfile(profile: Profile) {
    this.profiles.push(profile);
    this.login(profile);
  }

  getName$(): Observable<string> {
    return this.data;
  }

  checkProfile(candidate: Profile): boolean {
    return this.profiles.findIndex(profile => profile.email === candidate.email && profile.password === candidate.password) !== -1;
  }

  login(candidate: Profile) {
    this.profile = this.profiles.find(profile => profile.email === candidate.email && profile.password === candidate.password);
    console.log('pushedName ' + this.profile.name);
    this.subject.next(this.profile.name);
  }

  logout() {
    this.subject.next(null);
    this.profile = null;
  }
}
