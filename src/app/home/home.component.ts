import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { OurItemsService } from '../services/our-items.service';
import { Subscription, throwError } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  interval: any
  activeSlideIndex: number;
  TOTAL_SLIDES: number = 3;
  SLIDE_INTERVAL: number = 4000
  itemsData: any = [];
  error: boolean = false;
  ourItems: {}[] = [];
  mainItem: any;
  startId: number = 0;
  constructor(private itemService: ItemsService, private ourItemsService: OurItemsService, private firebase: FirebaseService) {

  }

  isSlideActive(index: number): boolean {
    return index === this.startId;
  }
  ngOnInit(): void {
    this.itemService.globalUsersItemsList.subscribe(data => {
      if (data != null) {
        this.itemsData = data['value'];
      }
    }, error => {
      this.error = !this.error;
      return throwError(this.error);
    });
    this.ourItems = this.ourItemsService.getItems();
    this.mainItem = this.ourItems[this.startId]


  }
  nextSlideLogic() {
    this.startId = (this.startId + 1) % this.TOTAL_SLIDES;

    this.updateMainItem();
  }


  previousSlide() {
    this.startId = (this.startId - 1 + this.TOTAL_SLIDES) % this.TOTAL_SLIDES;
    this.updateMainItem();


  }

  nextSlide() {
    this.startId = (this.startId + 1) % this.TOTAL_SLIDES;
    this.updateMainItem();
  }

  updateMainItem() {
    this.mainItem = this.ourItems[this.startId];
  }


}
