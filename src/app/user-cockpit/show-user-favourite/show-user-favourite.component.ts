import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ItemModel } from 'src/app/models/items.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-show-user-favourite',
  templateUrl: './show-user-favourite.component.html',
  styleUrls: ['./show-user-favourite.component.css']
})
export class ShowUserFavouriteComponent implements OnInit {
  data: any
  userId: string;
  constructor(private database: DatabaseService, private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.showFavouriteItems();
    this.database.userId.subscribe(data => {
      this.userId = data;
    })
  }


  deleteItem(index: number) {

    this.database.deleteFromUserFavouriteList(index)
      .subscribe(() => {
        this.showFavouriteItems();
      });
  }


  showFavouriteItems() {
    this.database.fetchFavouriteUserList().subscribe(data => {
      this.data = data;
    });
  }
}
