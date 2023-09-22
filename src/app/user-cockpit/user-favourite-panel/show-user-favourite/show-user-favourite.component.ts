
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  msg: string
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

        if (this.data.length === 0) {
          this.showFavouriteItems()
        }
      });
  }


  showFavouriteItems() {
    this.database.fetchFavouriteUserList().subscribe(data => {
      console.log(data)
      this.data = data;
    })
  }
}
