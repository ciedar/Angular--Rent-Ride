import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-favourite-item',
  templateUrl: './favourite-item.component.html',
  styleUrls: ['./favourite-item.component.css']
})
export class FavouriteItemComponent implements OnInit {
  id: number;
  favouriteArr: any[];
  favItem: any;
  constructor(private database: DatabaseService, private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
    })

    if (this.id !== -1) {
      this.database.fetchFavouriteUserList()
        .subscribe(fetchedData => {
          this.favItem = fetchedData[this.id];
          console.log(this.favItem)
        })
    }
  }

  sendDirectMsg(email: string) {
    const userEmail = email;
    this.router.navigate(['user-panel/messages/new-message'], { queryParams: { email: userEmail } });
  }
}
