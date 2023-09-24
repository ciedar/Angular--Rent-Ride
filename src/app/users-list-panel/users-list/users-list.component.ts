import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserSendServiceService } from '../user-send-service.service';

interface response {
  email: string,
  username: string
}
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})



export class UsersListComponent implements OnInit {
  usersList: any[] = [];
  userInfo: any
  constructor(private database: DatabaseService, private router: Router, private userData: UserSendServiceService) {

  }

  ngOnInit(): void {
    this.database.getUserList().subscribe(data => {
      this.usersList = data;
      console.log(this.usersList);
    })
  }


  navigate(index: number) {
    this.userInfo = this.usersList[index];
    if (this.userInfo.items) {
      const a = Object.values(this.userInfo.items)
      this.userData.trigger(this.userInfo, a);
    } else {
      this.userData.trigger(this.userInfo, []);
    }
    this.router.navigate(['/users-list', index])
  }
}
