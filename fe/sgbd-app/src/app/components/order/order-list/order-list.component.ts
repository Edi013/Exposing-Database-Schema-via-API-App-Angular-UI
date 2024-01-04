import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder: Order = {};
  isEditMode = false;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.orders$.subscribe((orders) => {
      this.orders = orders;
    });

    this.orderService.getAllOrders();
  }

  editOrder(order: Order): void {
    this.isEditMode = true;
    this.selectedOrder = { ...order };
  }

  async deleteOrder(order: Order): Promise<void> {
    this.isEditMode = false;
    this.orderService.deleteOrder(order);
  }

  getOrderProperties(order: Order): { label: string; value: string }[] {
    var properties: { label: string; value: string }[] = [];
    
    for (const [key, value] of Object.entries(order)) {
      if (key !== 'client') {
        const formattedLabel = key.charAt(0).toUpperCase() + key.slice(1);
        properties.push({ label: formattedLabel, value: String(value) });
      }
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
