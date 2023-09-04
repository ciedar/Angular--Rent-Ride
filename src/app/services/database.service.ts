import { Injectable, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
// import { User } from '../models/user.model';
import { ItemModel } from '../models/items.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  postItemByUserFirebaseLink: string = `https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/items.json`
  createUserInDatabaseLink: string = 'https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json'
  user: User
  userId = new BehaviorSubject<any>(null);
  constructor(private firebase: FirebaseService, private httpClient: HttpClient) {
    this.firebase.user.subscribe((data: User) => {
      this.user = data;
    })
  }

  getUserId() {
    return this.httpClient.get('https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .pipe(
        map(data => {
          const user = Object.entries(data).find(([id, value]) => value.email === this.user.email)
          return user[0]
        })
      )
  }

  getUserItems(userId: string) {
    return this.httpClient.get<ItemModel>(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/items.json`)
      .pipe(
        map(responseData => {
          const arr = Object.values(responseData);
          return arr;
        })
      )
  }




  addItemToUserItemList(item: ItemModel) {
    return this.httpClient.get('https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .subscribe((userData) => {
        const userArray = Object.entries(userData);
        const user = userArray.find(([id, value]) => value.email === this.user.email);
        if (user) {
          const userId = user[0];
          this.httpClient.post<ItemModel>(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/items.json`, item)
            .subscribe();
        }
      });
  }

  addItemToItemList(item: ItemModel) {
    return this.httpClient.post<ItemModel>(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/items.json`, item);
  }




}
