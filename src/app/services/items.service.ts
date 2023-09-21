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
      if (data) {
        this.list = data;
        return this.globalUsersItemsList.next(data);
      } else {
        return
      }
    })
  }

  ngOnInit(): void {

  }

}
