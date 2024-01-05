import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Order } from '../models/order';
import { BehaviorSubject, Observable, catchError, last, lastValueFrom, of, tap } from 'rxjs';
import { EachOrderDto } from 'src/DTOs/orderDTOs/each-order-dto';
import { OverallOrderStatisticsDto } from 'src/DTOs/orderDTOs/overall-order-statistics-dto';
import { NeverOrderedItemDto } from 'src/DTOs/orderDTOs/never-ordered-item-dto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private apiUrl: string = environment.apiUrl;
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$: Observable<Order[]> = this.ordersSubject.asObservable();

  private ordersStatisticsSubject = new BehaviorSubject<EachOrderDto[]>([]);
  ordersStatisticsSubject$: Observable<EachOrderDto[]> = this.ordersStatisticsSubject.asObservable();

  private overallOrdersStatisticsSubject = new BehaviorSubject<OverallOrderStatisticsDto | null>(null);
  overallOrdersStatisticsSubject$: Observable<OverallOrderStatisticsDto | null> = this.overallOrdersStatisticsSubject.asObservable();

  private neverOrderedItemDtoSubject = new BehaviorSubject<NeverOrderedItemDto[]>([]);
  neverOrderedItemDtoSubject$: Observable<NeverOrderedItemDto[]> = this.neverOrderedItemDtoSubject.asObservable();

  constructor(private http: HttpClient) {}

  async getAllOrders(): Promise<Order[]> {
    const response = this.http.get<Order[]>(`${this.apiUrl}/Order/GetAll`, this.httpOptions);

    try {
      const orders = await lastValueFrom(response);
      this.ordersSubject.next(orders);
      return orders;
    } catch (error) {
      console.error('Error fetching orders', error);
      throw error; 
    }
  }

  async getEachOrderStatistics(): Promise<EachOrderDto[]> {
    const response = this.http.get<any>(`${this.apiUrl}/Order/GetEachOrderStatistics`, this.httpOptions);

    try {
      const orders = await lastValueFrom(response);
      this.ordersStatisticsSubject.next(orders);
      return orders;

    } catch (error) {
      console.error('Error fetching orders', error);
      throw error; 
    }
  }

  async getOverallOrderStatistics(): Promise<OverallOrderStatisticsDto> {
    const response = this.http.get<any>(`${this.apiUrl}/Order/GetOverallOrderStatistics`, this.httpOptions);

    try {
      const orders = await lastValueFrom(response);
      this.overallOrdersStatisticsSubject.next(orders);
      return orders;

    } catch (error) {
      console.error('Error fetching orders', error);
      throw error; 
    }
  }

  async getNeverOrderedItems(): Promise<NeverOrderedItemDto[]> {
    const response = this.http.get<any>(`${this.apiUrl}/Order/GetNeverOrderedItems`, this.httpOptions);

    try {
      const orders = await lastValueFrom(response);
      this.neverOrderedItemDtoSubject.next(orders);
      return orders;

    } catch (error) {
      console.error('Error fetching orders', error);
      throw error; 
    }
  }

  async updateOrder(order: Order): Promise<Order> {
    if (order.clientId === undefined ) {
        prompt('You have an empty client ID. Cannot create order.');
        return Promise.reject('Invalid client ID. Cannot create order.');
    }

    const url = `${this.apiUrl}/Order/Update`;

    const response = this.http.put<Order>(url, order, this.httpOptions).pipe(
      tap((updatedOrder) => {
        const updatedOrders = this.ordersSubject.value.map((o) =>
          o.clientId === updatedOrder.clientId ? { ...o, ...updatedOrder } : o
        );
        this.ordersSubject.next(updatedOrders);
      })
    );
    return await lastValueFrom(response);
  }

  async createOrder(order: Order): Promise<Order> {
    if (order.clientId === undefined ) {
      prompt('You have an empty client ID. Cannot create order.');
      return Promise.reject('Invalid client ID. Cannot create order.');
    }
    order.client = null;
    const url = `${this.apiUrl}/Order/Create`;
    try{
        const response = this.http.post<Order>(url, order, this.httpOptions).pipe(
            tap(() => {
              const updatedOrders = [...this.ordersSubject.value, order];
              this.ordersSubject.next(updatedOrders);
            })
          );
        return await lastValueFrom(response);
    }catch(error) {
        prompt("Invalid Key inserted");
    }
    return Promise.reject('Invalid Key inserted. Cannot create order.');
  }

  async deleteOrder(order: Order): Promise<void> {
    const url = `${this.apiUrl}/Order/Delete/${order.id}`;
    const response = this.http.delete<void>(url, { headers: this.httpOptions.headers })
    .pipe(
      tap(() => {
        const updatedOrders = this.ordersSubject.value.filter((o) => o.id !== order.id);
        this.ordersSubject.next(updatedOrders);
      })
    );
    return await lastValueFrom(response);
  }
}
