import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
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
  editItemEvent = new BehaviorSubject<any>(null);
  constructor(private database: DatabaseService, private router: Router, private route: ActivatedRoute) { }


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

  editItem(index: number) {
    this.router.navigate(['edit', index], { relativeTo: this.route });
    this.editItemEvent.next(index);
  }
}
