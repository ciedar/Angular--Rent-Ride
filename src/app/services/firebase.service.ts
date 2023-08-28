import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Observable, catchError, pipe, BehaviorSubject } from 'rxjs';




import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firebaseConfig: {} = {
    apiKey: "AIzaSyD_IZilycDr_yZ5IZev6CaD0swa0G05yM8",
    authDomain: "tablica-20451.firebaseapp.com",
    projectId: "tablica-20451",
    storageBucket: "tablica-20451.appspot.com",
    messagingSenderId: "786188365700",
    appId: "1:786188365700:web:c6ad7148b974ca9cbc37d1",
    measurementId: "G-0MTBRQ2M18"
  };
  app = initializeApp(this.firebaseConfig);
  analytics = getAnalytics(this.app);
  constructor(private httpClient: HttpClient) {

  }

  registerUserWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  }

}

