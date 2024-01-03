import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client } from '../models/client';
import { BehaviorSubject, Observable, catchError, last, lastValueFrom, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  private apiUrl: string = environment.apiUrl;
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private clientsSubject = new BehaviorSubject<Client[]>([]);
  clients$: Observable<Client[]> = this.clientsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/Client/GetAll`).pipe(
      tap((clients) => {
        this.clientsSubject.next(clients);
      }),
      catchError((error) => {
        console.error('Error fetching clients', error);
        return of([]);
      })
    );
  }

  updateClient(client: Client): Observable<Client> {
    const url = `${this.apiUrl}/Client/Update`;
    return this.http.put<Client>(url, client, this.httpOptions).pipe(
      tap(() => {
        // Update the list after successful update
        const updatedClients = this.clientsSubject.value.map((c) =>
          c.id === client.id ? { ...c, ...client } : c
        );
        this.clientsSubject.next(updatedClients);
      })
    );
  }

  createClient(client: Client): Observable<Client> {
    const url = `${this.apiUrl}/Client/Add`;
    return this.http.post<Client>(url, client, this.httpOptions).pipe(
      tap(() => {
        // Update the list after successful creation
        const updatedClients = [...this.clientsSubject.value, client];
        this.clientsSubject.next(updatedClients);
      })
    );
  }

  deleteClient(client: Client): Observable<void> {
    const url = `${this.apiUrl}/Client/Delete/${client.id}`;
    return this.http.delete<void>(url, { headers: this.httpOptions.headers }).pipe(
      tap(() => {
        // Update the list after successful deletion
        const updatedClients = this.clientsSubject.value.filter((c) => c.id !== client.id);
        this.clientsSubject.next(updatedClients);
      })
    );
  }

  // async getAllClients(): Promise<Client[]> {
  //   const response = this.http.get<any>(
  //     `${this.apiUrl}/Client/GetAll`
  //   );
  //   return await lastValueFrom(response);
  // }

  // async updateClient(client: Client): Promise<Client>{
  //   const response = this.http.put<Client>(
  //     `${this.apiUrl}/Client/Update`, client, this.httpOptions
  //   );
  //   return await lastValueFrom(response);
  // }

  // async createClient(client: Client): Promise<Client>{
  //   const response = this.http.post<Client>(
  //     `${this.apiUrl}/Client/Add`, client, this.httpOptions
  //   );

  //   return await lastValueFrom(response);
  // }

  // async deleteClient(client: Client){
  //   const response = this.http.delete(`${this.apiUrl}/Client/Delete/${client.id}`, {headers: this.httpOptions.headers});
    
  //   return await lastValueFrom(response)
  // }
}
