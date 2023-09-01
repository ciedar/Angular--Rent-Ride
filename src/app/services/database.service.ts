import { Injectable, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
// import { User } from '../models/user.model';
import { ItemModel } from '../models/items.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  postItemByUserFirebaseLink: string = `https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/items.json`
  createUserInDatabaseLink: string = 'https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json'
  user: User
  sendUserItems = new BehaviorSubject<any>(null)
  constructor(private firebase: FirebaseService, private httpClient: HttpClient) {
    this.firebase.user.subscribe((data: User) => {
      this.user = data;
    })
  }

  // getUserItems() {
  //   return this.httpClient.get('https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json')
  //     .subscribe((userData) => {
  //       const userArray = Object.entries(userData);
  //       const user = userArray.find(([id, value]) => value.email === this.user.email);
  //       if (user) {
  //         const userId = user[0]; // Unikalne ID użytkownika
  //         this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/items.json`)
  //           .subscribe((itemsData) => {
  //             this.sendUserItems.next(Object.values(itemsData))
  //           });
  //       }
  //     });
  // }
  getUserItems() {
    return this.httpClient.get<ItemModel>('https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .pipe(
        map(data => {
          const userArray = Object.entries(data);
          const user = userArray.find(([id, value]) => value.email === this.user.email);
          if (user) {
            console.log(user[0])
            const userId = user[0];
            this.httpClient.get(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/items.json`)
              .pipe(
                map(response => {
                  console.log(Object.values(response))
                })
              )

          }
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
          this.httpClient.post(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/items.json`, item)
            .subscribe();
        }
      });
  }



}
