import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ItemModel } from 'src/app/models/items.model';

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
    this.database.getUserId()
      .subscribe(data => {
        this.userId = data;
      })

    this.database.getUserId().subscribe(data => {
      if (data) {
        this.database.getItem(data).subscribe(responseData => {
          this.itemId = responseData.keys[this.itemIndex]
          this.item = responseData.values[this.itemIndex];

          if (this.item) {
            // this.item.imgUrl = this.item.imgUrl.map(imgObj => imgObj.img);
            this.buildForm();
          }
        });
      }
    });
  }

  private buildForm() {
    this.editForm = new FormGroup({
      'name': new FormControl(this.item.name, Validators.required),
      'itemDescription': new FormControl(this.item.itemDescription, Validators.required),
      'price': new FormControl(this.item.price, Validators.required),
      'imgUrl': new FormArray([])
      // 'imgUrl': new FormArray(this.item.imgUrl.map(imgUrl => new FormControl(imgUrl))) // Przekształca linki z powrotem na FormControl
    });

  }
  getImg() {
    return (<FormArray>this.editForm.get('imgUrl')).controls;
  }


  onSubmit(data: FormGroup) {
    const model = new ItemModel(
      data.value.name,
      data.value.itemDescription,
      data.value.imgUrl,
      data.value.price,
      this.user.email
    )
    console.log(model);

    this.database.updateUserItem(this.userId, this.itemId, model).subscribe()
  }

}