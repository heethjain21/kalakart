import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-user-view-order',
  templateUrl: './user-view-order.component.html',
  styleUrls: ['./user-view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  id;
  order: Order;
  items;
  orderStatus;
  orderUpdatedOn;
  headerData = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService) {

    this.id = this.route.snapshot.paramMap.get('id');

    this.headerData['title'] = "Order Summary";
    this.headerData['description'] = "Details for your order no: " + this.id;
    this.headerData['imageUrl'] = "banner3.jpg";
    this.headerData['height'] = "300";

    if (this.id)
      this.orderService.get(this.id).take(1).subscribe(o => {
        this.order = o;
        this.orderStatus = o['details']['status'];
        this.orderUpdatedOn = o['details']['updatedOn'] as Number;
        this.orderUpdatedOn = new Date(this.orderUpdatedOn).toLocaleString();
      });

  }

  ngOnInit() {
  }

  cancelOrder() {

    if (!confirm('Are you sure you want to cancel this order?')) return;

    this.orderStatus = "Cancelled";
    this.orderUpdatedOn = new Date().getTime();
    this.order.details = {
      "status": this.orderStatus,
      "updatedOn": this.orderUpdatedOn
    };
    this.orderUpdatedOn = new Date(this.orderUpdatedOn).toLocaleString();
    this.orderService.updateOrder(this.id, this.order);
  }

}
