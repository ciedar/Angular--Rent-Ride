import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-direct-chat',
  templateUrl: './direct-chat.component.html',
  styleUrls: ['./direct-chat.component.css']
})
export class DirectChatComponent implements OnInit {
  @ViewChild('message', { static: false }) messageInput: ElementRef<HTMLInputElement>
  test: any;
  user: string
  constructor(private database: DatabaseService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.user = params.get('name');
      console.log(this.user)
    })
    this.database.getMessage(this.user).subscribe(data => {
      this.test = data;
    });
  }

  sendMsg() {
    const msg = this.messageInput.nativeElement.value
    const deliverTo = this.user
    console.log(this.user)
    this.database.sendMyMessage(deliverTo, msg).subscribe()
    this.database.sendMessage(deliverTo, msg).subscribe()
    this.messageInput.nativeElement.value = '';
    this.database.getMessage(this.user).subscribe(data => {
      this.test = data;
    });
  }
}
