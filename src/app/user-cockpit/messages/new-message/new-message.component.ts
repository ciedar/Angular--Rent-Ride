import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {
  sendMessageForm: FormGroup
  userEmail: string
  constructor(private database: DatabaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.userEmail = data['email']
      console.log(this.userEmail)
    })

    if (!this.userEmail) {
      this.sendMessageForm = new FormGroup({
        'do': new FormControl(null, Validators.required),
        'text': new FormControl(null)
      });
    } else {
      this.sendMessageForm = new FormGroup({
        'do': new FormControl(this.userEmail, Validators.required),
        'text': new FormControl(null)
      });
    }
  }

  sendMessage(data: FormGroup) {
    const username = data.value['do']
    const message = data.value['text']
    console.log(username, message)
    this.database.sendMessage(username, message).subscribe(data => console.log(data));
    this.database.sendMyMessage(username, message).subscribe(data => console.log(data));
  }

}
