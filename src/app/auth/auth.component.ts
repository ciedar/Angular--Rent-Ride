import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { FirebaseService } from '../services/firebase.service';
import { Subscription, BehaviorSubject } from 'rxjs'
import { User } from '../models/user.model';




@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  registerForm: FormGroup
  registerSubscription: Subscription;
  user: User;
  userEmitter = new BehaviorSubject<User>(null)
  constructor(private firebase: FirebaseService) {

  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    })
  }


  submitForm(data: FormGroup) {
    const email = data.value.email;
    const password = data.value.password;
    this.firebase.registerUserWithEmailAndPassword(email, password)
      .then((data) => {
        // this.user = {
        //   email: data.user.email,
        //   id: data.user.uid,
        //   _token: data.user.getIdTokenResult()
        // }
      })
      .catch((error) => {
        console.error(error.message);
      })
  }


}
