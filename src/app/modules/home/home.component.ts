import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DataService} from '../../data-service';
import {Restaurant} from '../../models/Restaurant';
import {ProviderService} from '../../services/provider.service';
import {Table} from '../../models/Table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {ModalGeneratorService} from "../../modal-generator.service";
import {ModalComponent, ModalOptions} from "../../components/modal/modal.component";
import {MANAGER_KEY} from "../../api_config";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('myTrigger', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  welcomeMessage = 'Welcome to DinnerApp!';
  userName = '';
  subscription: Subscription;
  loggedIn = false;
  isDropdownOpen = false;

  restaurants: Restaurant[];
  public tables: Table[] = [];

  public imagesUrl;
  isManager: boolean;

  constructor(public router: Router, private dataService: DataService,
              private provider: ProviderService,
              private modalGeneratorService: ModalGeneratorService) { }

  checkBoolean = (value) => {
    return value === 'true';
  };

  ngOnInit() {

    this.isManager = this.checkBoolean(localStorage.getItem(MANAGER_KEY));

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
        id: 1,
        location: 'almaty',
        district: 'City',
        imageUrl: 'https://thespaces.com/wp-content/uploads/2018/07/Catch-restaurant-Kiev-KO5A1779-1024x683.jpg',
        cuisine: 'Italian',
        reviews: [{
          description: 'Good restaurant',
          author: '',
          date: new Date(),
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

  closeDropDown() {
    this.isDropdownOpen = false;
  }

  onLogout() {
    console.log("logout")
    // const modalOptions = new ModalOptions('Modal example title','Modal example body');
    // this.modalGeneratorService.addModal(modalOptions);
    localStorage.removeItem('isLogged');
    this.loggedIn = false;
    this.dataService.logout();
    this.router.navigate(['/']).catch(reason => {
      console.log(reason);
    })
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

  onTableBook(table: Table) {
    console.log(table);
  }

  onManagerClick() {
    this.router.navigate(['/new']);
  }

  onUpdateClick() {
    this.router.navigate(['/update']);
  }

  onDeleteTable(table: Table) {
    console.log("tableId:" + table.id);
    this.dataService.delete(table.id).then(value => {
      this.getTables();
    }).catch(reason => {
      console.log(reason);
    });
  }

}
