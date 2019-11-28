import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DataService} from '../../data-service';
import {Restaurant} from '../../models/Restaurant';
import {ProviderService} from '../../services/provider.service';
import {Table} from '../../models/Table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  welcomeMessage = 'Welcome to DinnerApp!';
  userName = '';
  subscription: Subscription;
  loggedIn = false;

  restaurants: Restaurant[];
  public tables: Table[] = [];

  public imagesUrl;

  constructor(private dataService: DataService,
              private provider: ProviderService) { }

  ngOnInit() {
    console.log('is logged ', this.dataService.isAuthenticated());
    if (this.dataService.isAuthenticated()) {
      this.loggedIn = true;
      // this.subscription = this.dataService.getName$().subscribe(name => {
      //   console.log('current title is' + name);
      //   if (name) {
      //     this.userName = name;
      //     console.log('username is' + name);
      //     this.welcomeMessage = this.userName + ', Welcome to DinnerApp! ';
      //     console.log('welcome is' + this.welcomeMessage);
      //     setTimeout(() => this.loggedIn = true);
      //     this.loggedIn = true;
      //   } else {
      //     this.loggedIn = false;
      //     this.welcomeMessage = 'Welcome to DinnerApp!';
      //   }
      //   console.log(this.loggedIn);
      // });
    }

    this.imagesUrl = [
      'https://images.adsttc.com/media/images/5ab4/7a83/f197/cc29/0200/00ad/newsletter/KO5A2144.jpg?1521777273',
      'https://images.adsttc.com/media/images/5ab4/799d/f197/ccb6/f600/011e/slideshow/KO5A1836.jpg?1521777043',
    ];
    this.restaurants = [
      {
        district: 'City',
        imageUrl: 'https://thespaces.com/wp-content/uploads/2018/07/Catch-restaurant-Kiev-KO5A1779-1024x683.jpg',
        kitchen: 'Italian',
        reviews: [{
          description: 'Good restaurant',
        }],
        title: 'Outback Lodge Almaty',
      },
    ];

    for (let i = 1; i < 3; ++i) {
      const candidate = this.restaurants[0];
      for (let j = 0; j <= i; ++j) {
        candidate.reviews.push(candidate.reviews[0]);
      }
      this.restaurants.push(candidate);
    }

    this.getTables();
  }

  onLogout() {
    localStorage.removeItem('isLogged');
    this.loggedIn = false;
    this.dataService.logout();
  }

  getTables() {
    this.tables = null;
    this.provider.getTables().then(res => {
      this.tables = res;
    });
    console.log(this.tables);
  }

  ngOnDestroy(): void {
  }

}
