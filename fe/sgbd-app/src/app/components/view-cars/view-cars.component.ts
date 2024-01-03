import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.scss']
})
export class ViewCarsComponent implements OnInit {

  cars: Car[];

  constructor(
    private carService: CarService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private changes: ChangeDetectorRef) { 
  }

  async ngOnInit(): Promise<void> {
    this.cars = []

    await this.getAllCars();
  }
  async getAllCars(){
    var result = await this.carService.getAllCars()//.then(x => this.cars = x);
    this.cars = result
    this.changes.detectChanges();
  }

  navigateToCreateCar(){
    this.router.navigate(['create-car']);
  }

  logout(){
    this.authenticationService.logout();
  }

  onCardDelete(selectedCar: Car){
    this.cars = this.cars.filter(car => car.id !== selectedCar.id)
  }
}
