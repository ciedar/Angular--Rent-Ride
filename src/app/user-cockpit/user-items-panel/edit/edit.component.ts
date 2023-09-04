import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  itemId: number
  userId: string;
  item: any
  constructor(private route: ActivatedRoute, private database: DatabaseService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = +params['index']
    })

    this.database.getUserId().subscribe(data => {
      if (data) {
        this.database.getItem(data).subscribe(responseData => {
          this.item = responseData[this.itemId];
          console.log(this.item)
        })
      }
    })

  }

}
