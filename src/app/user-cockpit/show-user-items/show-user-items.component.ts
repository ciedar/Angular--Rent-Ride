import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  constructor(private database: DatabaseService) { }


  ngOnInit(): void {
    this.database.getUserId().subscribe(data => {
      this.id = data;
    })
  }
  getUserItems() {
    this.database.getUserItems(this.id).subscribe(data => {
      this.userItems = data;
      console.log(this.userItems)
      // this.ak = this.userItems[0]
      // console.log(this.ak)
      // console.log(this.userItems[0].img)
      // this.userItems = [{
      //   info: data,
      //   img: data[0].imgUrl
      // }]
      // console.log(this.userItems)
      // console.log(this.userItems[0].imgUrl)
      // this.userItems = data
      // console.log(this.userItems)
      // this.userItems.forEach(item => {
      //   if (item.imgUrl && Array.isArray(item.imgUrl) && item.imgUrl.length > 0) {
      //     const imgValue = item.imgUrl[0].img;
      //     // console.log(imgValue)
      //     this.userImgUrl.push(imgValue);
      //   }
      //   console.log(this.userImgUrl)
      // });
    }
    )
  }
}

// getUserItems() {
//   this.database.getUserItems().subscribe((dataa) => {
//     this.subscription = this.database.sendUserItems.subscribe(data => {
//       // this.userItems = Object.values(data.items);
//       // console.log(this.userItems)
//       Object.values(data).forEach((a) => {
//         console.log(a);
//         // const item = new ItemModel(a.name, a.itemDescription, a.imgUrl, a.price, a.owner)
//       })

//     })
//   })
// }