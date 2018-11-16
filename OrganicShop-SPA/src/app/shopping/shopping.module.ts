import { ProductsComponent } from './_components/products/products.component';
import { ShoppingCartComponent } from './_components/shopping-cart/shopping-cart.component';
import { SharedModule } from './../shared/shared.module';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDropdownModule, BsDatepickerModule, ModalModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { CheckOutComponent } from './_components/check-out/check-out.component';
import { ShoppingCartSummaryComponent } from './_components/shopping-cart-summary/shopping-cart-summary.component';
import { appRoutes } from '../appRoutes';
import { RouterModule } from '@angular/router';
import { ShippingFormComponent } from './_components/shipping-form/shipping-form.component';
import { CommonModule } from '@angular/common';
import { OrderSuccessComponent } from './_components/order-success/order-success.component';
import { MyOrdersComponent } from './_components/my-orders/my-orders.component';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    OrderSuccessComponent,
    MyOrdersComponent,  
    // ProductFilterComponent,
  ]
})
export class ShoppingModule { }
