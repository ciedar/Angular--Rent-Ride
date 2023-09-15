import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, Form } from '@angular/forms';
import { filter, find, map, mergeMap, switchMap, take } from 'rxjs';
import { ItemModel } from 'src/app/models/items.model';
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
  itemModel: ItemModel;
  addItemPost: FormGroup;
  lastAddedItemId: string;
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


  takeIdItemAddedByUser() {
    return this.databaseService.getUserId().pipe(
      take(1),
      mergeMap(data => {
        return this.databaseService.getItem(data)
      }),
      map(mapData => {
        const length = mapData.value.length;
        const v = Object.values(mapData);
        return v[0][length - 1]
      })
    )
  }

  postItem(data: FormGroup) {
    this.itemModel = new ItemModel(
      data.value.name,
      data.value.description,
      data.value.imgUrl,
      data.value.price,
      this.user.email);

    this.databaseService.addItemToUserItemList(this.itemModel);
    this.takeIdItemAddedByUser().subscribe(resData => {
      this.databaseService.addItemToItemList(this.itemModel, resData).subscribe();

    })


    for (let i = 0; i <= (<FormArray>this.addItemPost.get('imgUrl')).controls.length; i++) {
      (<FormArray>this.addItemPost.get('imgUrl')).removeAt(i);
    }

    this.addItemPost.reset()

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
