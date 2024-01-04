import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Item } from '../models/item';
import { BehaviorSubject, Observable, catchError, last, lastValueFrom, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {

  private apiUrl: string = environment.apiUrl;
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  items$: Observable<Item[]> = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {}

  async getAllItems(): Promise<Item[]> {
    const response = this.http.get<Item[]>(`${this.apiUrl}/Item/GetAll`, this.httpOptions);

    try {
      const items = await lastValueFrom(response);
      this.itemsSubject.next(items);
      return items;
    } catch (error) {
      console.error('Error fetching items', error);
      throw error; 
    }
  }

  async updateItem(item: Item): Promise<Item> {
    // Add your validation logic if needed
    const url = `${this.apiUrl}/Item/Update`;

    const response = this.http.put<Item>(url, item, this.httpOptions).pipe(
      tap((updatedItem) => {
        const updatedItems = this.itemsSubject.value.map((i) =>
          i.orderId === updatedItem.orderId ? { ...i, ...updatedItem } : i
        );
        this.itemsSubject.next(updatedItems);
      })
    );
    return await lastValueFrom(response);
  }

  async createItem(item: Item): Promise<Item> {
    if(item.orderId == undefined == undefined)
    {
        prompt("Invalid orderId value inserted");
        return Promise.reject("Invalid orderId value inserted");
    }
    if(item.storageLocationId == undefined == undefined)
    {
        prompt("Invalid storageLocationId value inserted");
        return Promise.reject("Invalid storageLocationId value inserted");
    }
    const url = `${this.apiUrl}/Item/Create`;

    try {
      const response = this.http.post<Item>(url, item, this.httpOptions).pipe(
        tap(() => {
          const updatedItems = [...this.itemsSubject.value, item];
          this.itemsSubject.next(updatedItems);
        })
      );
      return await lastValueFrom(response);
    } catch (error) {
      prompt("Invalid Key inserted");
    }
    return Promise.reject('Invalid Key inserted. Cannot create item.');
  }

  async deleteItem(item: Item): Promise<void> {
    const url = `${this.apiUrl}/Item/Delete/${item.id}`;
    const response = this.http.delete<void>(url, { headers: this.httpOptions.headers })
    .pipe(
      tap(() => {
        const updatedItems = this.itemsSubject.value.filter((i) => i.id !== item.id);
        this.itemsSubject.next(updatedItems);
      })
    );
    return await lastValueFrom(response);
  }
}
