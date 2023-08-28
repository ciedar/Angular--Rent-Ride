import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('hamburger', { static: false }) hmburgerButton: ElementRef<HTMLElement>
  isLogged: boolean = false;

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
