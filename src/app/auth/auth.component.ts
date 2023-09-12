import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms'
import { AuthResponseData, FirebaseService } from '../services/firebase.service';
import { Observable, map, mergeMap } from 'rxjs';
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
  constructor(private firebase: FirebaseService, private router: Router, private database: DatabaseService) {

  }

  ngOnInit(): void {
    // this.checkUsernameValidator(this.registerForm.get('username'));
    this.registerForm = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.minLength(6), Validators.required])
    })

    if (!this.loginMode) {
      this.registerForm.addControl('username', new FormControl(null, [Validators.required, this.checkUsernameValidator.bind(this)]));
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

  checkUsernameValidator(data: FormControl): Promise<ValidationErrors> {
    return new Promise((resolve, reject) => {
      this.database.getUserList().pipe(
        map(data => {
          const values = Object.values(data).map(b => b.username);
          return values
        })
      ).subscribe((dataResponse) => {
        if (dataResponse.includes(data.value)) {
          console.log(data.value)
          resolve(
            { 'zajęty': dataResponse }
          )
        } else {
          return null
        }
      });
    })
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