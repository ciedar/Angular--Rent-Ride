import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {
  display: boolean = false;
  id: number
  itemData: any
  itemId: string[]
  sellerData: any;
  user: any
  constructor(private route: ActivatedRoute,
    private itemsService: ItemsService,
    private database: DatabaseService,
    private firebase: FirebaseService) {

  }

  ngOnInit(): void {
    this.firebase.user.subscribe(data => {
      this.user = data;
    })
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    })

    if (typeof this.id === 'number') {
      this.display = !this.display

      this.itemsService.globalUsersItemsList.subscribe(data => {
        if (data) {
          this.itemId = data.id[this.id]
          this.itemData = data.value[this.id]
          console.log(this.itemId)
          console.log(this.itemData)
          this.database.getOwnerOfItem(this.itemId).subscribe(data => {
            this.sellerData = data;
            console.log(this.sellerData)
          })
        }
      })
    }
  }
  // sasa

  addToFavourite() {
    this.database.addToFavouriteUserList(this.itemData).subscribe(data => {
      console.log(data);
    })
  }
}
