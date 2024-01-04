import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/item';
import { ItemService } from '../../../services/item.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  selectedItem: Item = {};
  isEditMode = false;

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.itemService.items$.subscribe((items) => {
      this.items = items;
    });

    this.itemService.getAllItems();
  }

  editItem(item: Item): void {
    this.isEditMode = true;
    this.selectedItem = { ...item };
  }

  async deleteItem(item: Item): Promise<void> {
    this.isEditMode = false;
    this.itemService.deleteItem(item);

    await this.itemService.getAllItems();
  }

  getItemProperties(item: Item): { label: string; value: string }[] {
    const properties: { label: string; value: string }[] = [];

    for (const [key, value] of Object.entries(item)) {
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
