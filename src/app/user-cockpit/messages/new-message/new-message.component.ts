import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent {

  constructor(private database: DatabaseService) { }

  sendMessage(username: string, message: string) {
    this.database.sendMessage(username, message).subscribe(data => console.log(data));
  }
}
