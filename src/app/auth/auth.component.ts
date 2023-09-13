import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, Form, AbstractControl } from '@angular/forms'
import { AuthResponseData, FirebaseService } from '../services/firebase.service';
import { Observable, debounceTime, map, mergeMap, of, switchMap, take, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';





@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  registerForm: FormGroup
  loginMode: boolean = false;
  error: null
  user: User
  usernames: string[] = [];
  constructor(private firebase: FirebaseService, private router: Router, private database: DatabaseService) {

  }

  ngOnInit(): void {


    this.registerForm = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.minLength(6), Validators.required])
    })

    if (!this.loginMode) {
      this.registerForm.addControl('username', new FormControl(null, [this.customValidator.bind(this)]));
    }
  }


  submitForm(data: FormGroup) {
    this.firebase.user.subscribe((data: User) => {
      this.user = data;

    })
    let obs = new Observable<AuthResponseData>

    if (!this.loginMode) {
      obs = this.firebase.registerWithEmailAndPassword(data.value.email, data.value.password);
      this.firebase.createUserInDatabase(data.value.email, data.value.password, data.value.username).subscribe();

    } else {
      obs = this.firebase.loginWithEmailAndPassword(data.value.email, data.value.password);
    }

    obs.subscribe(data => {
      this.router.navigate([''])
    }, error => {
      this.error = error;
    })
    console.log(data);

  }

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  // checkUsernameValidator(data: FormControl): Observable<ValidationErrors | null> {
  //   return this.database.getUserList().pipe(
  //     map(resData => {
  //       console.log(resData)
  //       if (resData.includes(data.value)) {
  //         console.log('dupa')
  //         return { 'zajęty': true }
  //       } else {
  //         return null
  //       }
  //     })
  //   )
  // }
  // checkUsernameValidator(data: FormControl): Observable<ValidationErrors | null> {
  //   return this.database.getUserList().pipe(
  //     map(resData => {
  //       console.log(data.value)
  //       console.log(resData);
  //       if (resData.includes(data.value)) {
  //         console.log(data.value)
  //         console.log('Nazwa użytkownika jest zajęta');
  //         this.registerForm.get('username').setErrors({ 'zajęty': true }); // Ustawienie błędu w polu username
  //         return { 'zajęty': true };
  //       } else {
  //         this.registerForm.get('username').setErrors(null); // Usunięcie błędu w polu username
  //         return null;
  //       }
  //     })
  //   );
  // }

  // customValidator(): Promise<{ [username: string]: boolean }> {
  //   let promise = new Promise((resolve, reject) => {
  //     this.database.getUserList().subscribe(data => {
  //       resolve(data)
  //     })
  //   })
  //   const data = promise.then(data => { return data });
  //   console.log(data)
  //   return null
  // }
  // customValidator(control: FormControl): Observable<{ [username: string]: boolean }> | null {
  //   this.database.getUserList().subscribe(resData => {
  //     if (resData.includes(control.value)) {
  //       console.log(resData);
  //       console.log(control.value)
  //       return { 'username': true };
  //     } else {
  //       return null
  //     }
  //   })
  //   return null
  // }
  // customValidator(control: FormControl): Observable<{ [username: string]: boolean }> {
  //   this.database.getUserList().pipe(
  //     map(data => {
  //       if (data.includes(control.value)) {
  //         console.log(control.value)
  //         return { 'nie': true }
  //       } else {
  //         return null
  //       }
  //     })
  //   ).subscribe()
  //   console.log('asdasd')
  //   return null
  // }
  customValidator(control: FormControl): Observable<{ [username: string]: boolean } | null> {
    return this.database.getUserList().pipe(
      map(data => {
        if (data.includes(control.value)) {
          console.log(control.value);
          console.log(this.registerForm)
          return { 'nie': true }; // Zwróć obiekt błędu, jeśli warunek jest spełniony
        } else {
          return null; // Zwróć null, jeśli warunek nie jest spełniony
        }
      })
    );
  }

}

  // const usernameArr: string[] = [];
  // console.log(data.value)
  //  this.database.getUserList().pipe(
    //   map(data => {
      //     const values = Object.values(data);
      //     for (let obj of values) {
        //       usernameArr.push(obj.username);
        //     }
        //   })
        // ).subscribe();
        // return null;


        // checkUsernameValidator(data: FormControl): Promise<ValidationErrors> {
        //   return new Promise((resolve, reject) => {
        //     this.database.getUserList().pipe(
        //       map(data => {
        //         const values = Object.values(data).map(b => b.username);
        //         return values
        //       })
        //     ).subscribe((dataResponse) => {
        //       console.log(dataResponse)
        //       if (dataResponse.includes(data.value)) {
        //         console.log('t', data.value)
        //         console.log(this.registerForm);
        //         resolve(
        //           { 'zajęty': true }
        //         )
        //       } else {
        //         console.log(this.registerForm);
        //         console.log('n', data.value)
        //         // reject(null);
        //       }
        //     });
        //     return null
        //   })
        // }