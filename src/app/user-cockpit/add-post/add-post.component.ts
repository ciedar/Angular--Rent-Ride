import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, Form } from '@angular/forms';
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
  addItemPost: FormGroup;

  constructor(private databaseService: DatabaseService, private firebase: FirebaseService) {

  }
  ngOnInit(): void {
    this.firebase.user.subscribe((data: User) => {
      this.user = data;
    })

    this.addItemPost = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null),
      'price': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'imgUrl': new FormArray([])
    })
  }

  postItem() {
    this.databaseService.additem(this.user).subscribe();
  }
  getImg() {
    return (<FormArray>this.addItemPost.get('imgUrl')).controls
  }

  onAddImgUrlInput() {
    (<FormArray>this.addItemPost.get('imgUrl')).push(new FormGroup({
      'img': new FormControl(null)
    }))
  }

  onRemoveImgUrlInput(index: number) {
    (<FormArray>this.addItemPost.get('imgUrl')).removeAt(index);
  }
}
