import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  @Input() selectedOrder: Order = {};
  @Input() isEditMode = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  async submitForm(): Promise<void> {
    if (this.isEditMode) {
      await this.orderService.updateOrder(this.selectedOrder);
    } else {
      await this.orderService.createOrder(this.selectedOrder);
    }
    
    this.selectedOrder = {};
    this.isEditMode = false;
    this.orderService.getAllOrders();
  }
}
