import { AuthService } from 'shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;
  headerData = {};

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {

    this.headerData['title'] = "My Orders";
    this.headerData['description'] = "All your past orders at one place!";
    this.headerData['imageUrl'] = "banner1.jpg";
    this.headerData['height'] = "300";
    this.orders$ = authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid));
  }
}
