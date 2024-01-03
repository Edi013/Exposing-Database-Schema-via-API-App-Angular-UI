import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Car } from '../models/car';
import { last, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {

  private apiUrl: string = environment.apiUrl;
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  async getAllCars(): Promise<Car[]> {
    const response = this.http.get<any>(
      `${this.apiUrl}/Car/GetAll`
    );
    return await lastValueFrom(response);
  }

  async updateCar(car: Car): Promise<Car>{
    const response = this.http.put<Car>(
      `${this.apiUrl}/Car/Update`, car, this.httpOptions
    );
    return await lastValueFrom(response);
  }

  async createCar(car: Car): Promise<Car>{
    const response = this.http.post<Car>(
      `${this.apiUrl}/Car/Add`, car, this.httpOptions
    );

    return await lastValueFrom(response);
  }

  async deleteCar(car: Car){
    const response = this.http.delete(`${this.apiUrl}/Car/Delete/${car.id}`, {headers: this.httpOptions.headers});
    
    return await lastValueFrom(response)
  }
}
