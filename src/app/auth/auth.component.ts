import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, Form, AbstractControl } from '@angular/forms'
import { AuthResponseData, FirebaseService } from '../services/firebase.service';
import { Observable, catchError, debounceTime, map, mergeMap, of, switchMap, take, tap, throwError } from 'rxjs';
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
      'password': new FormControl(null, [Validators.minLength(6), Validators.required]),
      'username': new FormControl(null, Validators.required, this.validateUsername.bind(this))
    })

  }


  submitForm(data: FormGroup) {

    this.firebase.user.subscribe((data: User) => {

      console.log(data)
      this.user = data;

    })
    let obs = new Observable<AuthResponseData>

    if (!this.loginMode) {
      obs = this.firebase.registerWithEmailAndPassword(data.value.email, data.value.password);

    } else {
      obs = this.firebase.loginWithEmailAndPassword(data.value.email, data.value.password);
    }

    obs.subscribe(dataa => {
      if (!this.loginMode) {
        this.firebase.createUserInDatabase(data.value.email, data.value.password, data.value.username).subscribe();
      }
      this.router.navigate([''])
    }, error => {
      this.error = error;
    })
    console.log(data);

  }

  switchMode() {
    this.loginMode = !this.loginMode;
    if (!this.loginMode) {
      this.registerForm.get('username').enable();
    } else {
      this.registerForm.get('username').setValue(null)
      this.registerForm.get('username').disable()
    }
  }


  validateUsername(data: FormControl): Observable<{ [key: string]: boolean }> {
    return this.database.getUserList().pipe(
      map(userList => {
        console.log(userList)
        if (!userList) return null;

        if (userList.indexOf(data.value) !== -1) {
          return { 'userExist': true }
        } else {
          return null;
        }
      })
    )
  }


}

