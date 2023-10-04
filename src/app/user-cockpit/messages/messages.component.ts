import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  constructor(private database: DatabaseService) { }


  ngOnInit(): void {
    this.database.fetchUserMessageList().subscribe(data => {
      console.log(data);
    })

  }

}
