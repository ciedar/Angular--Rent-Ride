import { Injectable } from '@angular/core';
import { OurItem } from '../models/our-items.model';

@Injectable({
  providedIn: 'root'
})
export class OurItemsService {
  ourItems: OurItem[] = [
    {
      name: 'Iphone 14',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate amet corporis saepe ipsa doloremque Minima, Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate amet corporis saepe ipsa doloremque. Minima?',
      price: 4999,
      imgUrl: 'https://prod-api.mediamarkt.pl/api/images/gallery_545_400/thumbnails/images/22/22982941/apple-iphone-14-pro-gwiezdna-czern-1.jpg',
      category: 'phone',
    },
    {
      name: 'Iphone 14 pro',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate amet corporis saepe ipsa doloremque Minima, Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate amet corporis saepe ipsa doloremque. Minima?',
      price: 4999,
      imgUrl: 'data:image/webp;base64,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',
      category: 'phone',
    },
    {
      name: 'Iphone 14 proMax',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate amet corporis saepe ipsa doloremque Minima, Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate amet corporis saepe ipsa doloremque. Minima?',
      price: 4999,
      imgUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTzD1ehO_1goYaXsBjiag6jGTVrt3uIUJX0rM-iHDKiFYktQB3L5zhBF7-VKA50fuFsL80lJ5hQfMkiUtvquotTbkqPNUN-kwlHrD5AeraN&usqp=CAc',
      category: 'phone',
    },
  ];
  constructor() {

  }


  getItems() {
    return this.ourItems.slice();
  }
}
