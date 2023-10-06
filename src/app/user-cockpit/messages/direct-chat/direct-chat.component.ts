import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-direct-chat',
  templateUrl: './direct-chat.component.html',
  styleUrls: ['./direct-chat.component.css']
})
export class DirectChatComponent implements OnInit {
  test: any;
  user: string
  arr: any;
  constructor(private database: DatabaseService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.user = params.get('name');
      console.log(this.user)
    })
    this.database.getMessage(this.user).subscribe(data => {
      this.test = data;
      console.log(this.test)
      data.forEach(type => {

      })
    });
  }
}
