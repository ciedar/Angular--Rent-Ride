import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, Form } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ItemModel } from 'src/app/models/items.model';
import { __values } from 'tslib';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  itemIndex: number;
  itemId: string;
  item: any;
  userId: string;
  user: User
  editForm: FormGroup;

  constructor(private route: ActivatedRoute, private database: DatabaseService, private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.firebase.user.subscribe(data => {
      this.user = data
    })
    this.route.params.subscribe(params => {
      this.itemIndex = +params['index'];
    });

    this.database.getUserId().subscribe(data => {
      console.log(data)
      if (data) {
        this.database.getItem(data).subscribe(responseData => {
          this.item = responseData;
          console.log(this.item)
          if (this.item) {
            this.editForm = new FormGroup({
              'name': new FormControl(this.item.name, Validators.required),
              'itemDescription': new FormControl(this.item.itemDescription, Validators.required),
              'price': new FormControl(this.item.price, Validators.required),
              'imgUrl': new FormArray([])
            });
            for (let img of this.item.imgUrl) {
              (<FormArray>this.editForm.get('imgUrl')).push(new FormGroup({
                'img': new FormControl(img.img)
              }))
            }

          }
        });
      }
    });
  }







  getImg() {
    return (<FormArray>this.editForm.get('imgUrl')).controls;
  }


  onSubmit(data: FormGroup) {
    const imgUrl = data.value.imgUrl.map(img => { return img })
    console.log(imgUrl);
    console.log(data.value.name)

    if (imgUrl.length != 0) {

      this.database.updateUserItem(this.userId, this.itemId, data.value.name, data.value.itemDescription, imgUrl, data.value.price, this.user.email)
        .subscribe(data => {
          console.log(data);
        })
    }

  }

}