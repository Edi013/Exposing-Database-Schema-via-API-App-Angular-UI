import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Order } from '../models/order';
import { BehaviorSubject, Observable, catchError, last, lastValueFrom, of, tap } from 'rxjs';

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
    
    const url = `${this.apiUrl}/Order/Create`;
    const response = this.http.post<Order>(url, order, this.httpOptions).pipe(
      tap(() => {
        const updatedOrders = [...this.ordersSubject.value, order];
        this.ordersSubject.next(updatedOrders);
      })
    );
    return await lastValueFrom(response);
  }

  async deleteOrder(order: Order): Promise<void> {
    const url = `${this.apiUrl}/Order/Delete/${order.clientId}`;
    const response = this.http.delete<void>(url, { headers: this.httpOptions.headers }).pipe(
      tap(() => {
        const updatedOrders = this.ordersSubject.value.filter((o) => o.clientId !== order.clientId);
        this.ordersSubject.next(updatedOrders);
      })
    );
    return await lastValueFrom(response);
  }
}
