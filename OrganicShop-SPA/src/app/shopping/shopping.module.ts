import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './_components/products/products.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDropdownModule, BsDatepickerModule, ModalModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [
    ProductsComponent,
    // ShoppingCartComponent,
    // CheckOutComponent,
    // OrderSuccessComponent,
    // MyOrdersComponent,
    // ProductFilterComponent,
    // ShoppingCartSummaryComponent,
    // ShippingFormComponent
  ]
})
export class ShoppingModule { }
