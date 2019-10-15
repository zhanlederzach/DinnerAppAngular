import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataService } from './data-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Welcome to DinnerApp!';
  welcomeMessage = 'Book your table anywhere';
  subscription: Subscription;
  public imagesUrl;

  constructor(private dataService: DataService) {
    this.subscription = this.dataService.getMessage().subscribe(name => {
      console.log(name)
      if(name) {
        console.log("this is name" + name)
        var title = this.title;
        this.title = name + ", " + title;
        console.log("current title is" + name)
      }
    });
  }

  ngOnInit() {
    console.log("current title is" + name)
    this.imagesUrl = [
      'https://thespaces.com/wp-content/uploads/2018/07/Catch-restaurant-Kiev-KO5A1779-1024x683.jpg',
      'https://images.adsttc.com/media/images/5ab4/7a83/f197/cc29/0200/00ad/newsletter/KO5A2144.jpg?1521777273',
      'https://images.adsttc.com/media/images/5ab4/799d/f197/ccb6/f600/011e/slideshow/KO5A1836.jpg?1521777043',
    ];
  }

}
