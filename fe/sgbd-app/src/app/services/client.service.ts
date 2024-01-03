import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client } from '../models/client';
import { last, lastValueFrom } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  async getAllClients(): Promise<Client[]> {
    const response = this.http.get<any>(
      `${this.apiUrl}/Client/GetAll`
    );
    return await lastValueFrom(response);
  }

  async updateClient(client: Client): Promise<Client>{
    const response = this.http.put<Client>(
      `${this.apiUrl}/Client/Update`, client, this.httpOptions
    );
    return await lastValueFrom(response);
  }

  async createClient(client: Client): Promise<Client>{
    const response = this.http.post<Client>(
      `${this.apiUrl}/Client/Add`, client, this.httpOptions
    );

    return await lastValueFrom(response);
  }

  async deleteClient(client: Client){
    const response = this.http.delete(`${this.apiUrl}/Client/Delete/${client.id}`, {headers: this.httpOptions.headers});
    
    return await lastValueFrom(response)
  }
}
