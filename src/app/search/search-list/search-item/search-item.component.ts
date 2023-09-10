import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {
  display: boolean = false;
  id: number
  itemData: any
  itemId: string[]
  constructor(private route: ActivatedRoute, private itemsService: ItemsService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    })

    if (typeof this.id === 'number') {
      this.display = !this.display

      this.itemsService.globalUsersItemsList.subscribe(data => {
        if (data) {
          this.itemId = data.id[this.id]
          this.itemData = data.value[this.id]

        }
      })
    }
  }
}
