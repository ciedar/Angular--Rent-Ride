import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    this.database.fetchFavouriteUserList().subscribe(data => {
      this.data = data;
    });
  }


  deleteItem(index: number) {
    this.database.userId.subscribe(data => {
      console.log(data);
      this.userId = data;
      console.log(this.userId)
    })

    this.database.deleteFromUserFavouriteList()
      .subscribe(data => {
        const arr: any[] = [...Object.keys(data)]
        return this.httpClient.delete(`https://tablica-20451-default-rtdb.europe-west1.firebasedatabase.app/users/${this.userId}/favourite/${arr[index]}.json`)
      })
  }
}
