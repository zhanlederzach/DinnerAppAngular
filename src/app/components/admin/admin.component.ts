import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../data-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  public radarChartData = [
    {data: [120, 130, 180, 70], label: '2017'},
    {data: [90, 150, 200, 45], label: '2018'}
  ];
  public radarChartType = 'radar';
  loggedIn = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    if (!this.dataService.isAdmin()) {
      this.router.navigate(['/']);
    }
    this.loggedIn = true;
  }

  onLogout() {
    this.dataService.logout();
    this.router.navigate(['/']);
  }

}
