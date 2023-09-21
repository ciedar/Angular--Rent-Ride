import { Injectable, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { ItemModel } from '../models/items.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, catchError, map, mergeMap, switchMap, take, tap, throwError } from 'rxjs';

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
          console.log(responseData);
          this.userItems.next({ key: keys, value: values });
          return { key: keys, value: values };
        })
      )
  }


  addItemToUserItemList(item: ItemModel) {
    return this.httpClient.get('https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .pipe(
        map(data => {
          const userArray = Object.entries(data);
          return userArray.find(([id, value]) => value.email === this.user.email)
        }),
        take(1),
        mergeMap((userData) => {
          const userId = userData[0];
          return this.httpClient.post<ItemModel>(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/items.json`, item)
        })
      )
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
  }

  getGlobalItemId() {
    return this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/items/.json`)
      .pipe(
        map(response => {
          return Object.entries(response).filter(data => data[1].owner === 'darek12@wp.pl');

        })
      )
  }


  updateUserItemInGlobalList(itemId: string, itemName: string, itemDescription: string, itemPrice: number, imgUrl: [], owner: string) {
    return this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/items.json`).pipe(
      map(data => {
        return Object.entries(data).find(([id, value]) => value.projectId === itemId);
      }),
      take(1),
      mergeMap(mapData => {
        const id = mapData[0];
        return this.httpClient.patch(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json`, {
          'imgUrl': imgUrl,
          'itemDescription': itemDescription,
          'name': itemName,
          'owner': owner,
          'price': itemPrice,
          'projectId': mapData[1].projectId
        });

      })
    );
  }


  deleteUserItem(userId: string, itemId: string) {
    return this.httpClient.delete(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/items/${itemId}.json`)
  }

  deleteUserItemInGlobalList(itemId: string) {
    return this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/items.json`)
      .pipe(
        map(data => {
          return Object.entries(data).find(([id, value]) => value.projectId === itemId);
        }),
        take(1),
        mergeMap(mapData => {
          console.log(mapData);
          // return mapData
          return this.httpClient.delete(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/items/${mapData[0]}.json`)
        })
      )
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


  addToFavouriteUserList(data) {
    return this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json`)
      .pipe(
        map(data => {
          const userInfo = Object.entries(data).find(([id, value]) => value.email === this.user.email)
          return userInfo[0];
        }),
        mergeMap(mapData => {
          return this.httpClient.post(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${mapData}/favourite.json`, data)
        })
      )
  }

  fetchFavouriteUserList() {
    return this.getUserId().pipe(
      take(1),
      mergeMap(data => {
        return this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${data}/favourite.json`)
      }),
      map(responseData => {
        const value = Object.values(responseData);
        const val = Object.values(value);
        return val;
      })
    )
  }


  deleteFromUserFavouriteList() {
    return this.getUserId().pipe(
      take(1),
      mergeMap(data => {
        this.userId.next(data);
        return this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${data}/favourite.json`)
      })
    )
  }
}