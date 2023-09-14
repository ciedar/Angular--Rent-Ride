import { Injectable, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { ItemModel } from '../models/items.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  postItemByUserFirebaseLink: string = `https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/items.json`
  createUserInDatabaseLink: string = 'https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json'
  user: User
  userId = new BehaviorSubject<any>(null);
  userPassword = new BehaviorSubject<any>(null);
  userItems = new BehaviorSubject<any>(null);
  existedUsernames = new BehaviorSubject<any>(null);
  constructor(private firebase: FirebaseService, private httpClient: HttpClient) {
    this.firebase.user.subscribe((data: User) => {
      this.user = data;
    })
  }

  getUserList() {
    return this.httpClient.get('https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .pipe(
        map(data => {
          if (data) {
            return Object.values(data).map(responseData => responseData.username);
          } else {
            return [];
          }
        }
        ))
  }

  getUserId() {
    return this.httpClient.get('https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .pipe(
        map(data => {
          const user = Object.entries(data).find(([id, value]) => value.email === this.user.email)
          console.log(data);
          return user[0]
        })
      )
  }
  getUserInfo(id: string) {
    return this.httpClient.get<User>(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`)
  }

  getOwnerOfItem(id) {
    return this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json`)
  }

  getUserItems(userId: string) {
    return this.httpClient.get<ItemModel>(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/items.json`)
      .pipe(
        catchError(error => {
          console.error(error)
          console.error(error.message)
          return throwError(error)
        }),
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
          this.userItems.next({ key: keys, value: values });
          return { key: keys, value: values };
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
    console.log(itemId)
    return this.httpClient.patch(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/items/${itemId}.json`, {
      'name': name,
      'itemDescription': itemDescription,
      'imgUrl': imgUrl,
      "price": price,
      'owner': owner
    })
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

  deleteUserItem(userId: string, itemId: string) {
    return this.httpClient.delete(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/items/${itemId}.json`)
  }


  fetchGlobalUsersItemsList() {
    return this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/items.json`).pipe(
      map(data => {
        if (data) {
          const keysArr = Object.keys(data);
          const valuesArr = Object.values(data);
          return { id: keysArr, value: valuesArr }
        } else {
          return null;
        }
      })
    )
  }
}