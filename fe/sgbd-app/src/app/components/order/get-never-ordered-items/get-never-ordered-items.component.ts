import { Component, OnInit } from '@angular/core';
import { NeverOrderedItemDto } from '../../../../DTOs/orderDTOs/never-ordered-item-dto';
import { OrderService } from '../../../services/order.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-never-ordered-items',
  templateUrl: './get-never-ordered-items.component.html',
  styleUrls: ['./get-never-ordered-items.component.scss']
})
export class GetNeverOrderedItemsComponent implements OnInit {
  neverOrderedItems: NeverOrderedItemDto[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.neverOrderedItemDtoSubject$.subscribe((items: NeverOrderedItemDto[]) => {
      this.neverOrderedItems = items;
    });

    this.orderService.getNeverOrderedItems();
  }

  navigateHome() {
    this.router.navigate(['']);
  }

  getNeverOrderedItemsProperties(item: NeverOrderedItemDto): { label: string; value: string }[] {
    var properties: { label: string; value: string }[] = [];

    for (const [key, value] of Object.entries(item)) {
      const formattedLabel = key.charAt(0).toUpperCase() + key.slice(1);
      properties.push({ label: formattedLabel, value: String(value) });
    }
    return properties;
  }
}
