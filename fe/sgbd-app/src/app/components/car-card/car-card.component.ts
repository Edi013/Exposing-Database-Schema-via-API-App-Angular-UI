import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent implements OnInit{
  @Input() car: Car 
  @Output() onDelete = new EventEmitter<Car>();
  imageUrl: string

  constructor(
    private carService : CarService,
    private router : Router)
  {
  }
  
  ngOnInit(){
    this.imageUrl = 'assets/images/' + this.car.brand + '.jpg';
  }

  deleteCar(){
    this.carService.deleteCar(this.car);
    this.onDelete.emit(this.car);
  }

  navigateToEdit(){
    this.router.navigate(
      ["edit-car"],
     {
      queryParams: {
        id: this.car.id,
        brand: this.car.brand,
        model: this.car.model,
        type: this.car.type,
        price: this.car.price
      }
     }
    );
  }
}
