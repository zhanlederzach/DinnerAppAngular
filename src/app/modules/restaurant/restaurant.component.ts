import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../../services/provider.service';
import {DataService} from '../../data-service';
import {ActivatedRoute, Router} from '@angular/router';
import {API_URL} from '../../api_config';
import {Restaurant} from '../../models/Restaurant';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
  animations: [
    trigger('myTrigger', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(200)),
    ]),
  ]
})
export class RestaurantComponent implements OnInit {
  loggedIn: boolean;
  id: number;
  private restaurant: Restaurant;
  item: any;
  currentCategory: any;
  commentBody = '';

  constructor(public route: ActivatedRoute, public router: Router,
              public dataService: DataService, public providerService: ProviderService) {
    this.route.data.subscribe((res) => {
      this.restaurant = res.restaurant;
      if (this.restaurant === undefined) {
        this.router.navigate(['/home']);
      }
    });
    this.item = '';
  }

  ngOnInit() {
    this.loggedIn = this.dataService.isAuthenticated();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.id)) {
      this.router.navigate(['/home']);
    }
    // this.restaurant = this.dataService.getRestaurant(this.id);
    if (this.restaurant === undefined) {
      this.router.navigate(['/home']);
    }
  }

  onLogout() {
    this.dataService.logout();
    this.loggedIn = false;
  }

  isAuthenticated() {
    return this.dataService.isAuthenticated();
  }

  putComment() {
    console.log(this.commentBody);
    this.dataService.putReview(this.id, this.commentBody);
    this.restaurant = this.dataService.getRestaurant(this.id);
    if (this.restaurant === undefined) {
      this.router.navigate(['']);
    }
    this.clearComment();
  }

  clearComment() {
    this.commentBody = '';
  }
}
