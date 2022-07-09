import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService, private productService: ProductService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();

    // Update Products Availability (i.e reduce the total available units after this order)
    for (var i = 0; i < order.items.length; i++)
      this.productService.removeAvailableUnits(order.items[i].id, order.items[i].quantity);

    return result;
  }

  get(orderId) {
    return this.db.object('/orders/' + orderId);
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    });
  }

  updateOrder(orderId, order) {
    return this.db.object('/orders/' + orderId).update(order);
  }



}
