import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { FirebaseService } from './services/firebase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'RentRideAngular';
  user: User
  subscription: Subscription

  constructor(private firebase: FirebaseService) {

  }

  ngOnInit(): void {
    this.subscription = this.firebase.user.subscribe((data: User) => {
      this.user = data;
    })
    this.firebase.autoLogin()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
