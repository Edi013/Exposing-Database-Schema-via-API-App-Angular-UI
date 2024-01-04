import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageLocation } from '../models/storage-location';
import { BehaviorSubject, Observable, lastValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageLocationService {

  private apiUrl: string = environment.apiUrl;
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private storageLocationsSubject = new BehaviorSubject<StorageLocation[]>([]);
  storageLocations$: Observable<StorageLocation[]> = this.storageLocationsSubject.asObservable();

  constructor(private http: HttpClient) {}

  async getAllStorageLocations(): Promise<StorageLocation[]> {
    const response = this.http.get<StorageLocation[]>(`${this.apiUrl}/StorageLocation/GetAll`, this.httpOptions);

    try {
      const storageLocations = await lastValueFrom(response);
      this.storageLocationsSubject.next(storageLocations);
      return storageLocations;
    } catch (error) {
      console.error('Error fetching storage locations', error);
      throw error; 
    }
  }

  async updateStorageLocation(storageLocation: StorageLocation): Promise<StorageLocation> {
    if (storageLocation.providerId === undefined) {
      prompt('You have an empty provider ID. Cannot update storage location.');
      return Promise.reject('Invalid provider ID. Cannot update storage location.');
    }

    const url = `${this.apiUrl}/StorageLocation/Update`;

    const response = this.http.put<StorageLocation>(url, storageLocation, this.httpOptions).pipe(
      tap((updatedStorageLocation) => {
        const updatedStorageLocations = this.storageLocationsSubject.value.map((s) =>
          s.providerId === updatedStorageLocation.providerId ? { ...s, ...updatedStorageLocation } : s
        );
        this.storageLocationsSubject.next(updatedStorageLocations);
      })
    );
    return await lastValueFrom(response);
  }

  async createStorageLocation(storageLocation: StorageLocation): Promise<StorageLocation> {
    if (storageLocation.providerId === undefined ) {
      prompt('You have an empty provider ID. Cannot create storage location.');
      return Promise.reject('Invalid provider ID. Cannot create storage location.');
    }

    const url = `${this.apiUrl}/StorageLocation/Create`;
    try {
      const response = this.http.post<StorageLocation>(url, storageLocation, this.httpOptions).pipe(
        tap(() => {
          const updatedStorageLocations = [...this.storageLocationsSubject.value, storageLocation];
          this.storageLocationsSubject.next(updatedStorageLocations);
        })
      );
      return await lastValueFrom(response);
    } catch (error) {
      prompt("Invalid Key inserted");
    }
    return Promise.reject('Invalid Key inserted. Cannot create storage location.');
  }

  async deleteStorageLocation(storageLocation: StorageLocation): Promise<void> {
    const url = `${this.apiUrl}/StorageLocation/Delete/${storageLocation.id}`;
    const response = this.http.delete<void>(url, { headers: this.httpOptions.headers })
    .pipe(
      tap(() => {
        const updatedStorageLocations = this.storageLocationsSubject.value.filter((s) => s.id !== storageLocation.id);
        this.storageLocationsSubject.next(updatedStorageLocations);
      })
    );
    return await lastValueFrom(response);
  }
}
