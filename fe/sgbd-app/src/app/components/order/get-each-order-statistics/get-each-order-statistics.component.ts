import { Component, OnInit } from '@angular/core';
import { EachOrderDto } from '../../../../DTOs/orderDTOs/each-order-dto';
import { OrderService } from '../../../services/order.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-each-order-statistics',
  templateUrl: './get-each-order-statistics.component.html',
  styleUrls: ['./get-each-order-statistics.component.scss']
})
export class GetEachOrderStatisticsComponent implements OnInit {
  eachOrderStatistics: EachOrderDto[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.ordersStatisticsSubject$.subscribe((orderStatistics: EachOrderDto[]) => {
      this.eachOrderStatistics = orderStatistics;
    });

    this.orderService.getEachOrderStatistics();
  }

  navigateHome() {
    this.router.navigate(['']);
  }

  toggleEditMode() {
    // Toggle edit mode logic (if needed)
  }

  getOrderStatisticsProperties(orderStat: EachOrderDto): { label: string; value: string }[] {
    var properties: { label: string; value: string }[] = [];

    for (const [key, value] of Object.entries(orderStat)) {
      const formattedLabel = key.charAt(0).toUpperCase() + key.slice(1);
      properties.push({ label: formattedLabel, value: String(value) });
    }
    return properties;
  }
}
