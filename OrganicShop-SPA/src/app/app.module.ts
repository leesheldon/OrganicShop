import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule, BsDatepickerModule, ModalModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminProductsComponent } from './admin/_components/admin-products/admin-products.component';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './shared/_guards/auth.guard';
import { ProductForm_PreventUnsavedChanges, CategoryForm_PreventUnsavedChanges } from './shared/_guards/prevent-unsaved-changes.guard';
import { ShoppingModule } from './shopping/shopping.module';
import { AlertifyService } from './shared/_services/alertify.service';
import { AuthService } from './shared/_services/auth.service';
import { CategoryService } from './shared/_services/category.service';
import { AdminProductsResolver } from './shared/_resolvers/admin-products.resolver';
import { ProductsResolver } from './shared/_resolvers/products.resolver';
import { AdminCategoriesResolver } from './shared/_resolvers/admin-categories.resolver';
import { ShoppingCartService } from './shared/_services/shopping-cart.service';
import { appRoutes } from './appRoutes';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    AlertifyService,
    CategoryService,
    AuthGuard,
    ProductForm_PreventUnsavedChanges,
    CategoryForm_PreventUnsavedChanges,
    AdminProductsResolver,
    ProductsResolver,
    AdminCategoriesResolver,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
