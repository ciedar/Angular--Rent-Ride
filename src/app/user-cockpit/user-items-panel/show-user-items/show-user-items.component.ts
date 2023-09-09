import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ItemModel } from 'src/app/models/items.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-show-user-items',
  templateUrl: './show-user-items.component.html',
  styleUrls: ['./show-user-items.component.css']
})
export class ShowUserItemsComponent implements OnInit, OnDestroy {

  userItems: any
  id: string
  itemId: string;
  itemData: any
  // itemsSubscription: Subscription
  editItemEvent = new BehaviorSubject<any>(null);
  constructor(private database: DatabaseService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.itemId = +params['index'];
    //   console.log(this.itemId)
    // })

    this.database.getUserId()
      .subscribe(data => {
        this.id = data;
        if (this.id) {
          this.database.getItem(this.id)
            .subscribe(data => {
              // console.log(data)
              this.itemData = data

            })
          this.getUserItems();
        }
      })
  }
  ngOnDestroy(): void {
    // this.itemsSubscription.unsubscribe()
  }
  getUserItems() {
    this.database.getUserItems(this.id)
      .subscribe(data => {
        this.userItems = data;
      })
  }

  editItem(index: number) {
    this.router.navigate(['edit', index], { relativeTo: this.route });
    this.editItemEvent.next(index);
  }

  deleteItem(index: number) {
    const itemId = this.itemData.key[index];
    console.log(itemId)
    this.database.deleteUserItem(this.id, itemId)
      .subscribe()
  }
}
