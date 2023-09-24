import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSendServiceService {
  userInfo = new BehaviorSubject<any>(null);
  userItems = new BehaviorSubject<any>(null)
  constructor() { }

  trigger(userData, itemData) {
    this.userInfo.next(userData);
    this.userItems.next(itemData);
  }
}
