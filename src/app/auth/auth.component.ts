import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthResponseData, FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';





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
  constructor(private firebase: FirebaseService, private router: Router) {

  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.minLength(6), Validators.required])
    })
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

    obs.subscribe(data => {
      this.router.navigate(['/user-panel'])
    }, error => {
      this.error = error;
    })

  }

  switchMode() {
    this.loginMode = !this.loginMode;
  }


}
