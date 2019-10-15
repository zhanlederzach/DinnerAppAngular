import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.scss']
})
export class TableDetailsComponent implements OnInit {
  id: any;
  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
