import { Component, OnInit } from '@angular/core';
import { StorageLocation } from '../../../models/storage-location';
import { StorageLocationService } from '../../../services/storage-location.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-storage-location-list',
  templateUrl: './storage-location-list.component.html',
  styleUrls: ['./storage-location-list.component.scss'],
})
export class StorageLocationListComponent implements OnInit {
  storageLocations: StorageLocation[] = [];
  selectedStorageLocation: StorageLocation = {};
  isEditMode = false;

  constructor(private storageLocationService: StorageLocationService, private router: Router) {}

  ngOnInit(): void {
    this.storageLocationService.storageLocations$.subscribe((storageLocations) => {
      this.storageLocations = storageLocations;
    });

    this.storageLocationService.getAllStorageLocations();
  }

  editStorageLocation(storageLocation: StorageLocation): void {
    this.isEditMode = true;
    this.selectedStorageLocation = { ...storageLocation };
  }

  async deleteStorageLocation(storageLocation: StorageLocation): Promise<void> {
    this.isEditMode = false;
    this.storageLocationService.deleteStorageLocation(storageLocation);

    await this.storageLocationService.getAllStorageLocations();
  }

  getStorageLocationProperties(storageLocation: StorageLocation): { label: string; value: string }[] {
    var properties: { label: string; value: string }[] = [];

    for (const [key, value] of Object.entries(storageLocation)) {
      const formattedLabel = key.charAt(0).toUpperCase() + key.slice(1);
      properties.push({ label: formattedLabel, value: String(value) });
    }
    return properties;
  }

  navigateHome() {
    this.router.navigate(['']);
  }

  toggleEditMode(){
    this.isEditMode = ! this.isEditMode;
  }
}
