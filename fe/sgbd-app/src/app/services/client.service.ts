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

  constructor(private http: HttpClient) 
  {
  }

  // async getAllClients(): Promise<Client[]> {
  //     const response = this.http.get<any>(
  //     `${this.apiUrl}/Client/GetAll`, this.httpOptions
  //   );

  //   //var result = await lastValueFrom(response).then((clients) => this.clientsSubject.next(clients));
  //   return await lastValueFrom(response).then((clients) => this.clientsSubject.next(clients));;
  // }
  async getAllClients(): Promise<Client[]> {
    const response = this.http.get<Client[]>(`${this.apiUrl}/Client/GetAll`, this.httpOptions);
  
    try {
      const clients = await lastValueFrom(response);
      this.clientsSubject.next(clients);
      return clients;
    } catch (error) {
      console.error('Error fetching clients', error);
      throw error; // Rethrow the error to the caller
    }
  }

  async updateClient(client: Client): Promise<Client> {
    const url = `${this.apiUrl}/Client/Update`;

    var response = this.http.put<Client>(url, client, this.httpOptions).pipe(
      tap((updatedClient) => {
        const updatedClients = this.clientsSubject.value.map((c) =>
          c.id === updatedClient.id ? { ...c, ...updatedClient } : c
        );
        this.clientsSubject.next(updatedClients);
      })
    );
    return await lastValueFrom(response);
  }

  async createClient(client: Client): Promise<Client> {
    if (client.id === undefined || client.address === undefined || client.city === undefined || client.company === undefined ||
          client.firstName === undefined || client.lastName === undefined || client.phoneNumber === undefined ||  client.postalCode  === undefined) {
      prompt('You have empty fields . Cannot create client.');
      return Promise.reject('Invalid client ID. Cannot create client.');
    }
    
    const url = `${this.apiUrl}/Client/Create`;
    var response = this.http.post<Client>(url, client, this.httpOptions).pipe(
      tap(() => {
        const updatedClients = [...this.clientsSubject.value, client];
        this.clientsSubject.next(updatedClients);
      })
    );
    return await lastValueFrom(response)
  }

  async deleteClient(client: Client): Promise<void> {
    const url = `${this.apiUrl}/Client/Delete/${client.id}`;
    var response = this.http.delete<void>(url, { headers: this.httpOptions.headers }).pipe(
      tap(() => {
        const updatedClients = this.clientsSubject.value.filter((c) => c.id !== client.id);
        this.clientsSubject.next(updatedClients);
      })
    );
    return await lastValueFrom(response)
  }
}
