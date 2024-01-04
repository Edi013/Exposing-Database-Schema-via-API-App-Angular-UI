import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Provider } from '../models/provider';
import { BehaviorSubject, Observable, catchError, last, lastValueFrom, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {

  private apiUrl: string = environment.apiUrl;
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private providersSubject = new BehaviorSubject<Provider[]>([]);
  providers$: Observable<Provider[]> = this.providersSubject.asObservable();

  constructor(private http: HttpClient) {}

  async getAllProviders(): Promise<Provider[]> {
    const response = this.http.get<Provider[]>(`${this.apiUrl}/Provider/GetAll`, this.httpOptions);

    try {
      const providers = await lastValueFrom(response);
      this.providersSubject.next(providers);
      return providers;
    } catch (error) {
      console.error('Error fetching providers', error);
      throw error; 
    }
  }

  async updateProvider(provider: Provider): Promise<Provider> {
    if (provider.providerName === undefined) {
      prompt('You have an empty provider name. Cannot update provider.');
      return Promise.reject('Invalid provider name. Cannot update provider.');
    }

    const url = `${this.apiUrl}/Provider/Update`;

    const response = this.http.put<Provider>(url, provider, this.httpOptions).pipe(
      tap((updatedProvider) => {
        const updatedProviders = this.providersSubject.value.map((p) =>
          p.id === updatedProvider.id ? { ...p, ...updatedProvider } : p
        );
        this.providersSubject.next(updatedProviders);
      })
    );
    return await lastValueFrom(response);
  }

  async createProvider(provider: Provider): Promise<Provider> {
    if (provider.providerName === undefined) {
      prompt('Empty provider name. Cannot create provider.');
      return Promise.reject('Invalid provider name. Cannot create provider.');
    }

    const url = `${this.apiUrl}/Provider/Create`;
    const response = this.http.post<Provider>(url, provider, this.httpOptions).pipe(
      tap(() => {
        const updatedProviders = [...this.providersSubject.value, provider];
        this.providersSubject.next(updatedProviders);
      })
    );
    return await lastValueFrom(response);
  }

  async deleteProvider(provider: Provider): Promise<void> {
    const url = `${this.apiUrl}/Provider/Delete/${provider.id}`;
    const response = this.http.delete<void>(url, { headers: this.httpOptions.headers }).pipe(
      tap(() => {
        const updatedProviders = this.providersSubject.value.filter((p) => p.id !== provider.id);
        this.providersSubject.next(updatedProviders);
      })
    );
    return await lastValueFrom(response);
  }
}
