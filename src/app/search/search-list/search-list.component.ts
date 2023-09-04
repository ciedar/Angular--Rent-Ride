import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {


  listOfItems: any[] = []
  constructor(private itemService: ItemsService, private router: Router) {

  }

  ngOnInit(): void {
    this.listOfItems = this.itemService.rows;
  }

}
