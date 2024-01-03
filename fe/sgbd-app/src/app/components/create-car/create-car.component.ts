import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss']
})
export class CreateCarComponent implements OnInit {
  car: Client = {
    id: 0,
    brand: "",
    model: "",
    type: "",
    price: 0,
  }

  createForm!: FormGroup;

  constructor(
    private carService: CarService, 
    private formBuilder: FormBuilder,
    private router: Router) {
   }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      type:  ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  createCar(){
    this.carService.createCar(this.car);

    this.router.navigate(['view-cars']);
  }

  navigateToViewCars(){
    this.router.navigate(['view-cars']);
  }

  getBrandErrorMessage() {
    let brandControl = this.createForm.controls['brand'];
    return brandControl.value == "" ?
       'Brand required.'
       : '';
  }

  getModelErrorMessage() {
    let modelControl = this.createForm.controls['model'];
    return modelControl.value == "" ?
    'Model required.'
    : '';
  }

  getTypeErrorMessage() {
    let typeControl = this.createForm.controls['type'];
    return typeControl.value == "" ?
    'Type required.'
    : '';
  }

  getPriceErrorMessage() {
    let priceControl = this.createForm.controls['price'];
    return priceControl.value == "" ?
    'Price required.'
    : '';
  }
}
