import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'shared/models/order';
import { Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { UserService } from 'shared/services/user.service';
import { Subscription } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  cart: ShoppingCart;
  userSubscription: Subscription;
  userId: string;
  appUser: AppUser;
  orderValid: Boolean;
  shippingDetails;
  amount = {};
  headerData = {};
  email: string;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService,
    private userService: UserService,
    private http: HttpClient
  ) {

    this.orderValid = false;

    this.headerData['title'] = "Order Summary";
    this.headerData['description'] = "Thank you for shopping with us! Please check and confirm your order details before making your payment.";
    this.headerData['imageUrl'] = "banner1.jpg";
    this.headerData['height'] = "300";

  }

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.subscribe(data => {
      if (data['items'].length > 0)
        this.orderValid = true;
      this.cart = data;
      this.amount['subTotal'] = this.cart.totalPrice;
      this.amount['shipping'] = this.amount['subTotal'] < 500 ? 50 : 0;
      this.amount['grandTotal'] = this.amount['subTotal'] + this.amount['shipping'];
      console.log(this.amount);
    });
    this.authService.appUser$.subscribe(appUser => {
      this.shippingDetails = appUser['shipping'];
    });

  }

  payAndConfirm() {

    this.authService.appUser$.subscribe(appUser => {
      this.email = appUser['email'];
    });

    const body = {
      amount: this.amount['grandTotal'] * 100,
      currency: "INR",
      receipt: new Date().getTime() + ''
    };

    this.http.post(environment.razorpay.api, body).subscribe(res => {

      let options = {
        "key": environment.razorpay.key, // Enter the Key ID generated from the Dashboard
        "amount": this.amount['grandTotal'] * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "KalaKart",
        "description": "Thank you for shopping from KalaKart",
        "image": "/assets/images/logo_dark.png",
        "order_id": res['id'], //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": ((response) => {

          let paymentResponse = {
            'razorpay_order_id': response.razorpay_order_id,
            'razorpay_payment_id': response.razorpay_payment_id,
            'razorpay_signature': response.razorpay_signature
          };

          let paymentDetails = {
            'totalPrice': this.amount['grandTotal'],
            'razorpayOrderId': response.razorpay_order_id,
            'razorpayPaymentId': response.razorpay_payment_id
          }

          this.http.post(environment.razorpay.verify, paymentResponse).subscribe(res => {
            if (res['response'] === paymentResponse.razorpay_signature) {
              this.placeOrder(paymentDetails);
            }
          });

        }),
        "prefill": {
          "name": this.shippingDetails.name,
          "email": this.email,
          "contact": '91' + this.shippingDetails.phoneNo
        },
        "notes": {
          "address": "KalaKart"
        },
        "theme": {
          "color": "#3399cc"
        }
      };

      let rzp1 = new this.authService.nativeWindow.Razorpay(options);
      rzp1.open();

      rzp1.on('payment.failed', function (response) {
      });

    });

  }

  async placeOrder(paymentDetails) {
    let order = new Order(this.userId, this.shippingDetails, this.cart, paymentDetails, this.amount);
    console.log("Order:");
    console.log(order);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/my/orders', result.key]);
  }

}
