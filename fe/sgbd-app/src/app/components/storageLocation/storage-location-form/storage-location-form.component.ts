import { Component, Input, OnInit } from '@angular/core';
import { StorageLocation } from '../../../models/storage-location';
import { StorageLocationService } from '../../../services/storage-location.service';

@Component({
  selector: 'app-storage-location-form',
  templateUrl: './storage-location-form.component.html',
  styleUrls: ['./storage-location-form.component.scss'],
})
export class StorageLocationFormComponent implements OnInit {
  @Input() selectedStorageLocation: StorageLocation = {};
  @Input() isEditMode = false;

  constructor(private storageLocationService: StorageLocationService) {}

  ngOnInit(): void {}

  async submitForm(): Promise<void> {
    if (this.isEditMode) {
      await this.storageLocationService.updateStorageLocation(this.selectedStorageLocation);
    } else {
      await this.storageLocationService.createStorageLocation(this.selectedStorageLocation);
    }

    this.selectedStorageLocation = {};
    this.isEditMode = false;
    await this.storageLocationService.getAllStorageLocations();
  }
}
