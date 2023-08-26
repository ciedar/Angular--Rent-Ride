import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  num: number;
  @ViewChild('hamburger', { static: false }) hmburgerButton: ElementRef<HTMLElement>


  constructor(private router: Router) { }

  dropdownToggle() {
    this.hmburgerButton.nativeElement.classList.toggle('show')

  }

  ngOnInit(): void {

  }

  navigateToSearchList() {
    this.router.navigate(['/search']);
  }
}
