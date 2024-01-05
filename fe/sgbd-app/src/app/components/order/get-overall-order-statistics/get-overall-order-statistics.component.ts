import { Component, OnInit } from '@angular/core';
import { OverallOrderStatisticsDto } from '../../../../DTOs/orderDTOs/overall-order-statistics-dto';
import { OrderService } from '../../../services/order.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-overall-order-statistics',
  templateUrl: './get-overall-order-statistics.component.html',
  styleUrls: ['./get-overall-order-statistics.component.scss']
})
export class GetOverallOrderStatisticsComponent implements OnInit {
  overallOrderStatistics: OverallOrderStatisticsDto = {totalItems:0, totalOrders:0, overallOrderValue:0};

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.overallOrdersStatisticsSubject$.subscribe((statistics) => {
      this.overallOrderStatistics = statistics!;
    });

    this.orderService.getOverallOrderStatistics();
  }

  navigateHome() {
    this.router.navigate(['']);
  }

  getOverallOrderStatisticsProperties(statistic: OverallOrderStatisticsDto): { label: string; value: string }[] {
    var properties: { label: string; value: string }[] = [];

    for (const [key, value] of Object.entries(statistic)) {
      const formattedLabel = key.charAt(0).toUpperCase() + key.slice(1);
      properties.push({ label: formattedLabel, value: String(value) });
    }
    return properties;
  }
}
