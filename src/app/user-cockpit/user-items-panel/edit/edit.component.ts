// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { DatabaseService } from 'src/app/services/database.service';

// @Component({
//   selector: 'app-edit',
//   templateUrl: './edit.component.html',
//   styleUrls: ['./edit.component.css']
// })
// export class EditComponent implements OnInit {
//   itemId: number
//   userId: string;
//   item: any
//   editForm: FormGroup
//   constructor(private route: ActivatedRoute, private database: DatabaseService) {

//   }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.itemId = +params['index'];
//     });

//     this.database.getUserId().subscribe(data => {
//       if (data) {
//         this.database.getItem(data).subscribe(responseData => {
//           this.item = responseData[this.itemId];
//           console.log(this.item);

//           if (this.item) {
//             this.buildForm();
//             this.loadImages();
//           }
//         });
//       }
//     });
//   }

//   private buildForm() {
//     this.editForm = new FormGroup({
//       'name': new FormControl(this.item.name, Validators.required),
//       'itemDescription': new FormControl(this.item.itemDescription, Validators.required),
//       'price': new FormControl(this.item.price, Validators.required),
//       'imgUrl': new FormArray([])
//     });
//   }

//   private loadImages() {
//     if (this.item.imgUrl && Array.isArray(this.item.imgUrl)) {
//       const imgUrlArray = this.editForm.get('imgUrl') as FormArray;
//       for (const img of this.item.imgUrl) {
//         imgUrlArray.push(new FormControl(img));
//       }
//     }

//   }

// getImg() {
//   return (<FormArray>this.editForm.get('imgUrl')).controls;
// }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  itemId: number;
  item: any;
  editForm: FormGroup;

  constructor(private route: ActivatedRoute, private database: DatabaseService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = +params['index'];
    });

    this.database.getUserId().subscribe(data => {
      if (data) {
        this.database.getItem(data).subscribe(responseData => {
          this.item = responseData[this.itemId];
          console.log(this.item);

          if (this.item) {
            this.item.imgUrl = this.item.imgUrl.map(imgObj => imgObj.img); // Zamienia obiekty imgUrl na linki
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
      'imgUrl': new FormArray(this.item.imgUrl.map(imgUrl => new FormControl(imgUrl))) // Przekształca linki z powrotem na FormControl
    });

  }
  getImg() {
    return (<FormArray>this.editForm.get('imgUrl')).controls;
  }



}