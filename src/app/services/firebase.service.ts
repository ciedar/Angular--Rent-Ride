import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';




import { User } from '../models/user.model';
import { Router } from '@angular/router';



export interface AuthResponseData {
  email: string,
  password: string
  idToken: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
  registered?: boolean
}



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firebaseConfig = {
    apiKey: "AIzaSyD_IZilycDr_yZ5IZev6CaD0swa0G05yM8",
    authDomain: "tablica-20451.firebaseapp.com",
    projectId: "tablica-20451",
    storageBucket: "tablica-20451.appspot.com",
    messagingSenderId: "786188365700",
    appId: "1:786188365700:web:c6ad7148b974ca9cbc37d1",
    measurementId: "G-0MTBRQ2M18"
  };
  expTokenTime: any;
  registerLink: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebaseConfig.apiKey}`
  loginLink: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseConfig.apiKey}`
  app = initializeApp(this.firebaseConfig);
  analytics = getAnalytics(this.app);
  user = new BehaviorSubject<User>(null);
  error: string
  constructor(private httpClient: HttpClient, private router: Router) {

  }

  registerWithEmailAndPassword(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(this.registerLink, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(error => {
        this.error = error.error.error.message
        return throwError(this.error)
      }), tap(responseData => {
        const expDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000)
        const user = new User(responseData.email, responseData.localId, responseData.idToken, expDate)
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      }
      ))
  }

  loginWithEmailAndPassword(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(this.loginLink, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(error => {
        this.error = error.error.error.message;
        return throwError(this.error)
      }), tap(responseData => {
        const expDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000)
        const user = new User(responseData.email, responseData.localId, responseData.idToken, expDate)
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      })
    )
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) return

    const newUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

    if (newUser.token) {
      this.user.next(newUser);
      const time = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(time)
    }
  }

  autoLogout(time: number) {
    this.expTokenTime = setTimeout(() => {
      this.logout()
    }, time)
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('userData')
    if (this.expTokenTime) {
      clearTimeout(this.expTokenTime)
    }
    this.expTokenTime = null;
  }
}

