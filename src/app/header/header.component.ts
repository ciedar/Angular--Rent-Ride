import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  num: number;
  @ViewChild('hamburger', { static: false }) hmburgerButton: ElementRef<HTMLElement>


  dropdownToggle() {
    this.hmburgerButton.nativeElement.classList.toggle('show')

  }

  ngOnInit(): void {

  }
}
