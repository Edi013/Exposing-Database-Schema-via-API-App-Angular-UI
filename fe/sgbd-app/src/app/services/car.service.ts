import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client } from '../models/client';
import { last, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class clientService {

  private apiUrl: string = environment.apiUrl;
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  async getAllclients(): Promise<Client[]> {
    const response = this.http.get<any>(
      `${this.apiUrl}/Client/GetAll`
    );
    return await lastValueFrom(response);
  }

  async updateclient(client: Client): Promise<Client>{
    const response = this.http.put<Client>(
      `${this.apiUrl}/Client/Update`, client, this.httpOptions
    );
    return await lastValueFrom(response);
  }

  async createclient(client: Client): Promise<Client>{
    const response = this.http.post<Client>(
      `${this.apiUrl}/Client/Add`, client, this.httpOptions
    );

    return await lastValueFrom(response);
  }

  async deleteclient(client: Client){
    const response = this.http.delete(`${this.apiUrl}/Client/Delete/${client.id}`, {headers: this.httpOptions.headers});
    
    return await lastValueFrom(response)
  }
}
