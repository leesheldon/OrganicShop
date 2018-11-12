import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';

import { SharedModule } from './../shared/shared.module';
import { AdminProductsComponent } from './_components/admin-products/admin-products.component';
import { AdminCategoriesComponent } from './_components/admin-categories/admin-categories.component';
import { PaginationModule, BsDropdownModule, BsDatepickerModule, ModalModule, ButtonsModule } from 'ngx-bootstrap';
import { CategoryFormComponent } from './_components/category-form/category-form.component';
import { ProductFormComponent } from './_components/product-form/product-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutes } from '../appRoutes';

@NgModule({
    imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
      NgbModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      ModalModule.forRoot(),
      ButtonsModule.forRoot(),
      PaginationModule.forRoot(),
      RouterModule.forRoot(appRoutes),
    ],
    declarations: [      
      AdminProductsComponent,      
      AdminCategoriesComponent,      
      CategoryFormComponent,      
      ProductFormComponent
    ]
  })
  export class AdminModule { }
