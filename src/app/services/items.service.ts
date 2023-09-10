import { Injectable } from '@angular/core';
import { ItemModel } from '../models/items.model';
import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  globalUsersItemsList = new BehaviorSubject<any>(null)

  constructor(private database: DatabaseService) {
    this.database.fetchGlobalUsersItemsList().subscribe(data => {
      return this.globalUsersItemsList.next(data);
    })
  }
}
