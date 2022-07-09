import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from "../../../shared/models/order";
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping: AppUser['shipping'];
  userSubscription: Subscription;
  userId: string;
  appUser: AppUser;
  details;
  headerData = {};

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {

    this.headerData['title'] = "Shipping Details";
    this.headerData['description'] = "Your order will be delivered to the following details";
    this.headerData['imageUrl'] = "banner2.jpg";
    this.headerData['height'] = "300";

  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);

    this.authService.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      this.shipping = appUser['shipping'];
    });
  }

  getDetails() {
    return this.authService.appUser$
      .map(appUser => appUser);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  updateShippingDetails(f) {
    console.log("clicked");
    this.userService.updateShippingDetails(this.userId, this.shipping);
    this.router.navigate(['check-out'])
  }

}
