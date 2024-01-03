import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'edit-car-details',
  templateUrl: './edit-car-details.component.html',
  styleUrls: ['./edit-car-details.component.scss']
})
export class EditCarDetailsComponent implements OnInit {
  car: Client = {
    id: 0,
    brand: "",
    model: "",
    type: "",
    price: 0,
  }

  editForm!: FormGroup;

  constructor(
    private carService: CarService, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
   }

  ngOnInit(): void {
    this.car.brand = this.route.snapshot.queryParams['brand'] ?? "";
    this.car.id = parseInt(this.route.snapshot.queryParams['id'] ?? "", 10);
    this.car.model = this.route.snapshot.queryParams['model'] ?? "";
    this.car.type = this.route.snapshot.queryParams['type'] ?? "";
    this.car.price = parseFloat(this.route.snapshot.queryParamMap.get('price') ?? "");

    this.editForm = this.formBuilder.group({
      brand: [this.car.brand, Validators.required],
      model: [this.car.model, Validators.required],
      type:  [this.car.type, Validators.required],
      price: [this.car.price, Validators.required],
    });
  }

  updateCar(){
    this.carService.updateCar(this.car);

    this.router.navigate(['view-cars']);
  }

  navigateToViewCars(){
    this.router.navigate(['view-cars']);
  }

  getBrandErrorMessage() {
    let brandControl = this.editForm.controls['brand'];
    return brandControl.value == "" ?
       'Brand required.'
       : '';
  }

  getModelErrorMessage() {
    let modelControl = this.editForm.controls['model'];
    return modelControl.value == "" ?
    'Model required.'
    : '';
  }

  getTypeErrorMessage() {
    let typeControl = this.editForm.controls['type'];
    return typeControl.value == "" ?
    'Type required.'
    : '';
  }

  getPriceErrorMessage() {
    let priceControl = this.editForm.controls['price'];
    return priceControl.value == "" ?
    'Price required.'
    : '';
  }
}
