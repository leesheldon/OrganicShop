import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTableModule } from "angular-6-datatable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgModule } from "@angular/core";

import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { CategoryService } from './_services/category.service';
import { ProductService } from "./_services/product.service";
import { ShoppingCartService } from "./_services/shopping-cart.service";
import { OrderService } from "./_services/order.service";
import { AlertifyService } from "./_services/alertify.service";
import { HttpClientModule } from "@angular/common/http";
import { PaginationModule, ButtonsModule, ModalModule, BsDatepickerModule, BsDropdownModule } from "ngx-bootstrap";
import { ProductCardComponent } from './_components/product-card/product-card.component';
import { FilterByCategoryComponent } from './_components/filter-by-category/filter-by-category.component';
import { RouterModule } from "@angular/router";
import { appRoutes } from "../appRoutes";


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      DataTableModule,
      HttpClientModule,
      PaginationModule.forRoot(),
      NgbModule.forRoot(),
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      ModalModule.forRoot(),
      ButtonsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
    ],
    declarations: [      
      ProductCardComponent, 
      FilterByCategoryComponent
    ],
    exports: [
      ProductCardComponent,
      FilterByCategoryComponent,
      CommonModule,
      FormsModule,
      DataTableModule,
      NgbModule.forRoot().ngModule,
    ],
    providers: [
      // AuthService,
      // AlertifyService,
      // AuthGuard,
      // UserService,
      // CategoryService,
      // ProductService,
      // ShoppingCartService,
      // OrderService
    ]
  })
  export class SharedModule { }
  