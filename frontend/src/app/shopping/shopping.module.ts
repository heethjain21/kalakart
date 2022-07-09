import { SharedModule } from './../shared/shared.module';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ViewOrderComponent } from './components/user-view-order/user-view-order.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'shipping-details', component: ShippingFormComponent, canActivate: [AuthGuard] },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'my/orders/:id', component: ViewOrderComponent, canActivate: [AuthGuard] },
    ])
  ],
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShippingFormComponent,
    ViewOrderComponent,
  ]
})
export class ShoppingModule { }
