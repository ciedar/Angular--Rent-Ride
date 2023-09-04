import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemModel } from 'src/app/models/items.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-show-user-items',
  templateUrl: './show-user-items.component.html',
  styleUrls: ['./show-user-items.component.css']
})
export class ShowUserItemsComponent implements OnInit {

  userItems: any;
  userImgUrl: string[] = []
  ak = []
  id: string
  constructor(private database: DatabaseService) { }


  ngOnInit(): void {
    this.database.getUserId()
      .subscribe(data => {
        this.id = data;
      })
  }
  getUserItems() {
    this.database.getUserItems(this.id)
      .subscribe(data => {
        this.userItems = data;
        console.log(this.userItems)
      })
  }
}
