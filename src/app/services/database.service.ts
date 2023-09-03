import { Injectable, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
// import { User } from '../models/user.model';
import { ItemModel } from '../models/items.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, catchError, map, pipe, switchMap, take, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  postItemByUserFirebaseLink: string = `https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/items.json`
  createUserInDatabaseLink: string = 'https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json'
  user: User
  userId = new BehaviorSubject<any>(null);
  // sendUserItems = new BehaviorSubject<any>(null)
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
          // return { ...responseData, img: responseData.imgUrl ? responseData.imgUrl : [] }
          return [{ ...arr[0], img: arr[0].imgUrl ? arr[0].imgUrl : [] }]
          const itemArr = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              itemArr.push({ ...responseData[key] });
            }
          }
          return itemArr;
        })
      )
  }




  additem(item: ItemModel) {
    return this.httpClient.get('https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .subscribe((userData) => {
        const userArray = Object.entries(userData);
        const user = userArray.find(([id, value]) => value.email === this.user.email);
        if (user) {
          const userId = user[0]; // Unikalne ID użytkownika
          this.httpClient.post<ItemModel>(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/items.json`, item)
            .subscribe();
        }
      });
  }


}
