import { Injectable, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { ItemModel } from '../models/items.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  postItemByUserFirebaseLink: string = `https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/items.json`
  createUserInDatabaseLink: string = 'https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json'
  user: User
  userId = new BehaviorSubject<any>(null);
  userPassword = new BehaviorSubject<any>(null);
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

  getItem(userId: string) {
    return this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/items.json`)
      .pipe(
        map(responseData => {
          const keys = Object.keys(responseData);
          const values = Object.values(responseData);
          // console.log(values)
          return { name: values[0].name, itemDescription: values[0].itemDescription, imgUrl: values[0].imgUrl, price: values[0].price, owner: values[0].owner }
          return values
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


  changeUserPassword(userId: string, password: string) {
    return this.httpClient.patch(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`, {
      'password': password
    })

  }

  updateUserItem(userId: string,
    itemId: string,
    name: string,
    itemDescription: string,
    imgUrl: string[],
    price: number,
    owner: string) {
    return this.httpClient.patch(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/items/${itemId}.json`, {
      'name': name,
      'itemDescription': itemDescription,
      'imgUrl': imgUrl,
      "price": price,
      'owner': owner
    })

    // const a = Object.values(item);
    // console.log(a[2])
    // return this.httpClient.patch(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/items/${itemId}.json`, {
    // 'name': name,
    // 'itemDescription': itemDescription,
    // 'imgUrl': imgUrl,
    // "price": price,
    // 'owner': owner
    // })
  }

  updateUserItemInGlobalList() {
    return this.httpClient.get('https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/items.json')
      .pipe(
        map(data => {
          const list = Object.values(data);
          const item = list.find((value) => {
            return value.email === this.user.email
          })
          console.log(item);
          return item;
        })
      )
  }
}
