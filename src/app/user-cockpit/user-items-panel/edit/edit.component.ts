import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  item: any;
  userId: string;
  user: User
  editForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private database: DatabaseService, private firebase: FirebaseService) { }

  ngOnInit(): void {



    this.firebase.user.subscribe(data => {
      this.user = data
    })
    this.route.params.subscribe(params => {
      this.itemIndex = +params['index'];
    });

    this.database.getUserId().subscribe(data => {
      this.userId = data;
      if (data) {
        this.database.getItem(data).subscribe(responseData => {
          console.log(responseData);
          const itemData = {
            key: responseData.key[this.itemIndex],
            value: responseData.value[this.itemIndex]
          }
          this.item = itemData;
          if (this.item) {
            this.editForm = new FormGroup({
              'name': new FormControl(this.item.value.name, Validators.required),
              'itemDescription': new FormControl(this.item.value.itemDescription, Validators.required),
              'price': new FormControl(this.item.value.price, Validators.required),
              'imgUrl': new FormArray([])
            });
            for (let img of this.item.value.imgUrl) {
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
    // this.database.getGlobalItemId().subscribe(data => console.log(data));

    if (imgUrl.length != 0) {
      this.database.updateUserItem(this.userId, this.item.key, data.value.name, data.value.itemDescription, imgUrl, data.value.price, this.user.email)
        .subscribe(data => {
        })
      console.log(this.item.key)
      this.database.updateUserItemInGlobalList(this.item.key, data.value.name, data.value.itemDescription, data.value.price, imgUrl, this.user.email)
        .subscribe()
    }
    console.log(data.value)

  }

  cancel() {
    this.router.navigate(['/user-panel/user-items-panel']);
  }


}