import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

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

  constructor(private database: DatabaseService) {

  }

  ngOnInit(): void {
    // this.database.
  }
}
