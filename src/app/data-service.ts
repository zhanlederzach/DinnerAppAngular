import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Profile} from './models/Profile';
import {MainService} from './services/main.service';
import {API_URL, MANAGER_KEY, REFRESH_KEY, TOKEN_KEY} from './api_config';
import {ProviderService} from './services/provider.service';
import {Restaurant} from './models/Restaurant';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private subject = new BehaviorSubject<string>('');
  data = this.subject.asObservable();
  authenticated = false;

  private admin = false;

  // private observable = new Observable<string>();
  private profile: Profile;
  private profiles: Profile[] = [{
    password: '1234qwer',
    email: 'zhanel@gmail.com',
    name: 'Zhanel',
  }];
  private providerService: ProviderService;

  private restaurants: Restaurant[];

  constructor(providerService: ProviderService) {
    this.providerService = providerService;
    this.authenticated = localStorage.getItem('isLogged') !== null;

    if (localStorage.getItem('restaurants') !== null) {
      this.restaurants = JSON.parse(localStorage.getItem('restaurants'));
    } else {
      this.restaurants = [{
        id: 1,
        district: 'City',
        imageUrl: 'https://thespaces.com/wp-content/uploads/2018/07/Catch-restaurant-Kiev-KO5A1779-1024x683.jpg',
        cuisine: 'Turkish, Mediterranean',
        reviews: [{
          date: new Date(),
          author: 'Zhanel',
          description: 'Heey',
        }, {
          date: new Date(),
          author: 'Zhanel',
          description: 'Good mood',
        }],
        title: 'Bosphorus Restaurant',
        location: 'Zheltoksan 181 181, Zheltoksan St., Almaty 50040 Kazakhstan',
      }];
    }
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

  login(candidate: Profile): Promise<any> {
    return this.providerService.post(`${API_URL}/login`, candidate).then(resp => {
      console.log(resp);
      this.profile = {
        email: resp.email,
        name: resp.name,
        password: candidate.password,
      };
      // this.profiles.find(profile => profile.email === candidate.email && profile.password === candidate.password);
      console.log('pushedName ' + this.profile.name);
      this.subject.next(this.profile.name);
      this.setAuthenticated('true');
      localStorage.setItem(TOKEN_KEY, resp.token);
      localStorage.setItem(REFRESH_KEY, resp.refresh);
      localStorage.setItem(MANAGER_KEY, resp.manager);
    }).catch(reason => {
      console.log(reason);
      this.setAuthenticated(null);
    });
  }

  logout() {
    this.admin = false;
    this.subject.next(null);
    this.profile = null;
    this.setAuthenticated(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(MANAGER_KEY);
  }

  setAuthenticated(authenticated?: string) {
    if (!authenticated) {
      localStorage.removeItem('isLogged');
    } else {
      localStorage.setItem('isLogged', authenticated);
    }
    this.authenticated = authenticated != null;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getRestaurant(id: number): Restaurant | undefined {
    return this.restaurants.find(restaurant => restaurant.id === id);
  }

  putReview(id: number, commentBody: string) {
    const filtered = this.restaurants.find(restaurant => restaurant.id === id);
    filtered.reviews = [...filtered.reviews, {
      description: commentBody,
      author: 'Zhanel',
      date: new Date(),
    }];
    this.restaurants = [filtered, ...this.restaurants.filter(restaurant => restaurant.id !== id)];
  }

  isAdmin() {
    return this.admin;
  }

  adminEntered() {
    this.admin = true;
  }

  new(restaurant: { size: number; name: string; type: string }) {
    return this.providerService.post(`${API_URL}/new`, restaurant).then(resp => {
      console.log(resp);
    }).catch(reason => {
      console.error(reason);
    });
  }

  update(restaurant: {id: number; size: number; name: string; type: string }) {
    return this.providerService.post(`${API_URL}/update`, restaurant).then(resp => {
      console.log(resp);
    }).catch(reason => {
      console.error(reason);
    });
  }

  delete(id: number) {
    return this.providerService.delete(`${API_URL}/${id}/delete`, {}).then(resp => {
      console.log(resp);
    }).catch(reason => {
      console.error(reason);
    });
  }
}
