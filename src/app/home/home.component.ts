import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { OurItemsService } from '../services/our-items.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  interval: any
  TOTAL_SLIDES: number = 3;
  SLIDE_INTERVAL: number = 5000
  items: any[] = [];
  ourItems: {}[] = [];
  mainItem: any;
  startId: number = 0;
  constructor(private itemService: ItemsService, private ourItemsService: OurItemsService) {

  }


  ngOnInit(): void {
    this.items = this.itemService.rows;
    this.ourItems = this.ourItemsService.getItems();
    this.mainItem = this.ourItems[this.startId]

    this.interval = setInterval(() => {
      this.nextSlideLogic();
    }, this.SLIDE_INTERVAL);
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

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
