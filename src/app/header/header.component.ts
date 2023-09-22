import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('hamburger', { static: false }) hmburgerButton: ElementRef<HTMLElement>
  @ViewChild('value', { static: false }) valueOption: ElementRef<any>
  isLogged: boolean = false;
  user: User
  searchValue: string;

  constructor(private router: Router, private firebase: FirebaseService) { }

  dropdownToggle() {
    this.hmburgerButton.nativeElement.classList.toggle('show')

  }

  ngOnInit(): void {
    this.firebase.user.subscribe((data: User) => {
      this.user = data;
      if (data) {
        this.isLogged = !this.isLogged
      }
    })
  }

  navigateToSearchList() {
    const value = this.valueOption.nativeElement.value
    if (value === 'items') {
      this.router.navigate(['/search']);
    }

    if (value === 'users') {
      this.router.navigate(['/users-list']);
    }
  }
  logout() {
    this.isLogged = !this.isLogged;
    this.user = null;
    this.firebase.logout()
  }
}
