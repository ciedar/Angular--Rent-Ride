import { Injectable, OnInit } from '@angular/core';
import { ItemModel } from '../models/items.model';
import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService implements OnInit {
  list: any;
  globalUsersItemsList = new BehaviorSubject<any>(null)

  constructor(private database: DatabaseService) {
    this.database.fetchGlobalUsersItemsList().subscribe(data => {
      this.list = data;
      return this.globalUsersItemsList.next(data);
    })
  }

  ngOnInit(): void {
    // this.database.fetchGlobalUsersItemsList().subscribe(data => {
    //   this.list = data;
    //   console.log(this.list)
    //   return this.globalUsersItemsList.next(data);
    // })
  }


  // getItem(id: number) {
  //   console.log(this.list);
  //   return this.list[id];
  // }
}
