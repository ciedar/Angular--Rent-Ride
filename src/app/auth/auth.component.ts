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
  disabled: boolean = false
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
      this.registerForm.addControl('username', new FormControl(null, [], this.validateUsername.bind(this)));
    } else {
      this.registerForm.get('username').setValue(null);
    }
  }


  submitForm(data: FormGroup) {

    this.firebase.user.subscribe((data: User) => {
      this.user = data;

    })
    let obs = new Observable<AuthResponseData>

    if (!this.loginMode) {
      obs = this.firebase.registerWithEmailAndPassword(data.value.email, data.value.password);

    } else {
      obs = this.firebase.loginWithEmailAndPassword(data.value.email, data.value.password);
    }

    obs.subscribe(dataa => {
      this.firebase.createUserInDatabase(data.value.email, data.value.password, data.value.username).subscribe();
      this.router.navigate([''])
    }, error => {
      this.error = error;
    })
    console.log(data);

  }

  switchMode() {
    this.loginMode = !this.loginMode;
  }


  validateUsername(data: FormControl): Observable<{ [key: string]: boolean }> {
    return this.database.getUserList().pipe(
      map(userList => {
        if (userList.indexOf(data.value) !== -1) {
          return { 'userExist': true }
        } else {
          return null;
        }
      })
    )
  }


}

