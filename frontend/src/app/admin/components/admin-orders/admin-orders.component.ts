import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;
  headerData = {};

  constructor(private orderService: OrderService) {

    this.headerData['title'] = "Manage Orders";
    this.headerData['description'] = "All orders of all users at one place!";
    this.headerData['imageUrl'] = "banner3.jpg";
    this.headerData['height'] = "300";

    this.orders$ = orderService.getOrders();
  }
}
