import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {
  messageUserList: string[] = []
  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
    this.database.fetchUserMessageList()
      .subscribe(data => {
        this.messageUserList = data;
      })
  }
}
