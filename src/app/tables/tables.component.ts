import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  article = {
    id: 100,
    title: 'How to make router & navigation in Angular 8',
    author: 'Didin J.',
    description: 'A complete tutorial about creating router and navigation in the Angular 8 Web Application'
  };
  constructor() { }

  ngOnInit() {
  }

}
