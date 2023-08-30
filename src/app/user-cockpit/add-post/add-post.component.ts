import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { DatabaseService } from 'src/app/services/database.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  user: User;

  constructor(private databaseService: DatabaseService, private firebase: FirebaseService) {

  }
  ngOnInit(): void {
    this.firebase.user.subscribe((data: User) => {
      this.user = data;
    })
  }

  postItem() {
    console.log(this.user);
    this.databaseService.additem(this.user).subscribe();
  }
}
