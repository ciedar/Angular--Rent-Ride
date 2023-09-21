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
  constructor(private database: DatabaseService) {

  }

  ngOnInit(): void {
    this.database.fetchFavouriteUserList().subscribe(data => {
      this.data = data;
    });
  }
}
