import { Component, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription, catchError, filter, map, switchMap, take, throwError } from 'rxjs';
import { ItemModel } from 'src/app/models/items.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-show-user-items',
  templateUrl: './show-user-items.component.html',
  styleUrls: ['./show-user-items.component.css']
})
export class ShowUserItemsComponent implements OnInit {
  error: string = ''
  userItems: any
  userId: string
  itemId: string;
  itemData: any
  editItemEvent = new BehaviorSubject<any>(null);
  constructor(private database: DatabaseService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.showUserItems();
  }

  showUserItems() {
    this.database.getUserId().pipe(
      take(1),
      switchMap(data => {
        this.userId = data;
        return this.database.getUserItems(data)
      }),
      take(1),
      switchMap(responseData => {
        this.userItems = responseData;
        return this.database.getItem(this.userId)
      })).subscribe((data) => {
        this.itemData = data
        this.error = '';
      }, error => {
        this.error = 'Na Twojej liście nie znajdują sie żadne przedmioty'
        return throwError(this.error);
      })
  }


  editItem(index: number) {
    this.router.navigate(['edit', index], { relativeTo: this.route });
    this.editItemEvent.next(index);
  }

  deleteItem(index: number) {
    const itemId = this.itemData.key[index];
    console.log(itemId)
    this.database.deleteUserItem(this.userId, itemId)
      .subscribe()

    this.showUserItems();
  }
}
