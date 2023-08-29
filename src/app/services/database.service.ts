import { Injectable, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { User } from '../models/user.model';
import { ItemModel } from '../models/items.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements OnInit {
  user: User
  firebaseUserItemsLink: string = `https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/items.json`
  constructor(private firebase: FirebaseService, private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.firebase.user.subscribe((data: User) => {
      this.user = data;
    })
  }

  additem() {
    return this.httpClient.put<User>(this.firebaseUserItemsLink, {
      name: 'dupek',
      id: 12
    });
  }

}
