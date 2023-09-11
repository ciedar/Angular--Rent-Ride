import { Component, OnInit } from '@angular/core';
import { take, switchMap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { DatabaseService } from 'src/app/services/database.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  user: any;
  constructor(private firebase: FirebaseService, private database: DatabaseService) {

  }

  ngOnInit(): void {
    this.database.getUserId().pipe(
      take(1),
      switchMap((id: string) => {
        return this.database.getUserInfo(id);
      })
    ).subscribe(responseData => {
      this.user = responseData;
      console.log(this.user)
    })


  }
}
