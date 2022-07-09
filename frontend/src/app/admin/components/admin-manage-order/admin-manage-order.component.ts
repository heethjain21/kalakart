import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'shared/models/order';
import { CategoryService } from 'shared/services/category.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-manage-order',
  templateUrl: './admin-manage-order.component.html',
  styleUrls: ['./admin-manage-order.component.scss']
})
export class AdminManageOrderComponent implements OnInit {

  id;
  order: Order;
  items;
  orderStatusUpdatedOn;
  headerData = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService) {

    this.headerData['title'] = "Order Summary";
    this.headerData['description'] = "Details for your past order";
    this.headerData['imageUrl'] = "banner3.jpg";
    this.headerData['height'] = "300";

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.orderService.get(this.id).take(1).subscribe(o => {
        this.order = o;
        this.orderStatusUpdatedOn = o['details']['updatedOn'] as Number;
        this.orderStatusUpdatedOn = new Date(this.orderStatusUpdatedOn).toLocaleString();
      });

  }

  ngOnInit() {
  }

  onChange(newValue) {
    this.orderStatusUpdatedOn = new Date().getTime();
    this.order.details = {
      "status": newValue,
      "updatedOn": this.orderStatusUpdatedOn
    };
    this.orderStatusUpdatedOn = new Date(this.orderStatusUpdatedOn).toLocaleString();
    this.orderService.updateOrder(this.id, this.order);
  }

}
