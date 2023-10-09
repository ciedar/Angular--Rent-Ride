import { Injectable, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { ItemModel } from '../models/items.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, catchError, map, mergeMap, of, switchMap, take, tap, throwError } from 'rxjs';

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

  getMessage(user: string) {
    return this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json`)
      .pipe(
        switchMap(userData => {
          const my = Object.entries(userData).find(([id, data]) => data.email === this.user.email)
          return this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${my[0]}/messages.json`)
        }),
        map(msg => {
          return Object.values(msg).map(data => {
            if (data.from === user) {
              return data
            }
            if (data.to === user) {
              return data
            }
          })
        })
      )
  }

  sendMyMessage(email: string, message: string) {
    return this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json`)
      .pipe(
        switchMap(userData => {
          const user = Object.entries(userData).find(([id, value]) => value.email === this.user.email);
          const recipient = Object.entries(userData).find(([id, value]) => value.email === email);
          console.log(recipient[1].email)
          if (!user) {
            return throwError('something went wrong')
          }
          const myId = user[0];

          const myMessage = {
            text: message,
            to: recipient[1].email,
            type: 'sent',
            timestamp: Date.now()
          }

          return this.httpClient.post(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${myId}/messages.json`, myMessage)
        })
      )
  }

  sendMessage(email: string, message: string) {
    return this.httpClient.get<any[]>('https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json').pipe(
      switchMap(userData => {
        const user = Object.entries(userData).find(([id, value]) => value.email === this.user.email);
        const recipient = Object.entries(userData).find(([id, value]) => value.email === email);

        if (!recipient) {
          return throwError('Recipient not found');
        }

        const recipientId = recipient[0];

        const messageData = {
          text: message,
          from: user[1].email,
          type: 'recived',
          timestamp: Date.now()
        };

        return this.httpClient.post(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${recipientId}/messages.json`, messageData);
      }),
      catchError(error => {
        console.error('Error sending message:', error);
        return throwError(error);
      })
    );
  }


  fetchUserMessageList() {
    return this.httpClient.get('https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json').pipe(
      switchMap(data => {
        const info = Object.entries(data).find(([id, value]) => value.email === this.user.email);
        console.log(info)
        if (!info) {
          return throwError('Nie znaleziono informacji o użytkowniku.');
        }
        return this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${info[0]}/messages.json`);
      }),
      map(resData => {
        const userMessageList = [];
        Object.values(resData).forEach(data => {
          if (!userMessageList.includes(data.from) || !userMessageList.includes(data.to)) {
            userMessageList.push(data.from);
            userMessageList.push(data.to);
          }
        });
        return userMessageList;
      }),
      catchError(error => {
        console.error('Błąd w pobieraniu listy wiadomości użytkownika:', error);
        return of([]);
      })
    );
  }

  getUserList() {
    return this.httpClient.get('https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .pipe(
        map(data => {
          if (data) {
            return Object.values(data).map(responseData => responseData);
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
        if (responseData) {
          const value = Object.values(responseData);
          const val = Object.values(value);
          return val;
        } else {
          return null
        }
      })
    )
  }


  deleteFromUserFavouriteList(index: number) {
    return this.getUserId().pipe(
      take(1),
      mergeMap(data => {
        this.userId.next(data);
        return this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${data}/favourite.json`)
      }),
      take(1),
      mergeMap(resData => {
        if (resData) {
          const idArr = Object.keys(resData);
          return this.httpClient.delete(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${this.userId.value}/favourite/${idArr[index]}.json`)
        } else {
          return null;
        }
      })
    )
  }



}