import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppUser } from 'shared/models/app-user';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  products: Product[] = [];
  product: Product;
  appUser: AppUser;
  headerData = {};

  constructor(
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private productService: ProductService) {

    this.headerData['title'] = "Shopping Cart";
    this.headerData['description'] = "There's always room for some more items in your cart!";
    this.headerData['imageUrl'] = "banner3.jpg";
    this.headerData['height'] = "300";

    this.productService.getAll().take(1).subscribe(products => {
      this.products = products;
    });

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  login() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } })
  }

  getProductFromItem(item) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].$key === item.$key)
        return this.products[i];
    }
  }
}
