import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  } from '@angular/common';

@Component({
  selector: 'app-your-component',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  userLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToViewCars() {
    if(this.userLoggedIn == false){
      prompt("Log in first.")
      return;
    }
    this.router.navigate(['view-cars']);
  }

  navigateToHome(){
    this.router.navigate([""])
  }
}
