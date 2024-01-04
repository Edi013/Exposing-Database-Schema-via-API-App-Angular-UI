import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../models/item';
import { ItemService } from '../../../services/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
  @Input() selectedItem: Item = {};
  @Input() isEditMode = false;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {}

  async submitForm(): Promise<void> {
    if (this.isEditMode) {
      await this.itemService.updateItem(this.selectedItem);
    } else {
      await this.itemService.createItem(this.selectedItem);
    }

    this.selectedItem = {};
    this.isEditMode = false;
    await this.itemService.getAllItems();
  }
}
