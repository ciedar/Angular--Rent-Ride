import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserSendServiceService } from '../../user-send-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  index: number;
  userInfo: any
  userItems: any
  constructor(private route: ActivatedRoute, private userData: UserSendServiceService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.index = +params['id'];

    })

    this.userData.userInfo.subscribe(data => {
      this.userInfo = data;
    })

    this.userData.userItems.subscribe(data => {
      this.userItems = data;
    })
    console.log(this.userItems);
  }

}
