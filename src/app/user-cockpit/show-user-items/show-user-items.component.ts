import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemModel } from 'src/app/models/items.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-show-user-items',
  templateUrl: './show-user-items.component.html',
  styleUrls: ['./show-user-items.component.css']
})
export class ShowUserItemsComponent {

  userItems: any;
  subscription: Subscription;
  constructor(private database: DatabaseService) { }

  // getUserItems() {
  //   this.subscription = this.database.sendUserItems.subscribe((data) => {
  //     this.userItems = data;
  //     this.database.getUserItems()

  //   })
  // }

  getUserItems() {
    this.database.getUserItems().subscribe((data) => {
      console.log(data);
      this.userItems = data;
      console.log(this.userItems);
    })
  }
}
