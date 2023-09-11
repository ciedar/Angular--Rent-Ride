import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { ItemsService } from 'src/app/services/items.service';
@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {


  listOfDataItems: any[] = []
  listOfIdItems: string[];

  constructor(private itemService: ItemsService, private router: Router) {

  }

  ngOnInit(): void {
    this.itemService.globalUsersItemsList.pipe(
      map(data => {
        return data
      })
    ).subscribe(responseData => {
      if (responseData) {
        this.listOfIdItems = responseData.id;
        this.listOfDataItems = responseData.value
        console.log(this.listOfDataItems)
      }
    })
  }

}
