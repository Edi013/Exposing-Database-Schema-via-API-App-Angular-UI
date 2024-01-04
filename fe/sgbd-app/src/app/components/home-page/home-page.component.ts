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

  navigateToViewCliet() {
    this.router.navigate(['view-client']);
  }
  navigateToViewOrder() {
    this.router.navigate(['view-order']);
  }
  navigateToViewProvider() {
    this.router.navigate(['view-provider']);
  }
  navigateToViewStorageLocation() {
    this.router.navigate(['view-storageLocation']);
  }
  navigateToViewItem() {
    this.router.navigate(['view-item']);
  }

  // navigateToHome(){
  //   this.router.navigate([""])
  // }
}
