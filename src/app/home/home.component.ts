import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: any[] = [];

  constructor(private itemService: ItemsService) {

  }


  ngOnInit(): void {
    this.items = this.itemService.rows;
  }


}
