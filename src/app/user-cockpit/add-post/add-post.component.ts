import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {


  constructor(private databaseService: DatabaseService) {

  }
  postItem() {
    this.databaseService.additem().subscribe();
  }
}
