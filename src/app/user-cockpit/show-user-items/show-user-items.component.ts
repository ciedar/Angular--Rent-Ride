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

  userItems: [];
  subscription: Subscription;
  constructor(private database: DatabaseService) { }

  getUserItems() {
    this.database.getUserItems()
    this.subscription = this.database.sendUserItems.subscribe((data) => {
      this.userItems = data;
      console.log(this.userItems)
    })
  }
}
