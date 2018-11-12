import { Routes } from "@angular/router";
import { ProductsComponent } from "./shopping/_components/products/products.component";
import { ProductsResolver } from "./shared/_resolvers/products.resolver";
import { AuthGuard } from "./shared/_guards/auth.guard";
import { ProductFormComponent } from "./admin/_components/product-form/product-form.component";
import { ProductForm_PreventUnsavedChanges, CategoryForm_PreventUnsavedChanges } from "./shared/_guards/prevent-unsaved-changes.guard";
import { AdminProductsComponent } from "./admin/_components/admin-products/admin-products.component";
import { AdminProductsResolver } from "./shared/_resolvers/admin-products.resolver";
import { CategoryFormComponent } from "./admin/_components/category-form/category-form.component";
import { AdminCategoriesComponent } from "./admin/_components/admin-categories/admin-categories.component";
import { AdminCategoriesResolver } from "./shared/_resolvers/admin-categories.resolver";
import { LoginComponent } from "./core/_components/login/login.component";


export const appRoutes: Routes = [
    {
        path: '', component: ProductsComponent, 
        resolve: { products: ProductsResolver } 
    },
    {
        path: '', // this path will plus the path in children. Ex: localhost:4200/'' + 'members'
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'products', component: ProductsComponent, 
                resolve: {products: ProductsResolver} 
            },
            // { path: 'shopping-cart', component: ShoppingCartComponent },
            
            // { path: 'check-out', component: CheckOutComponent },
            // { path: 'order-success', component: OrderSuccessComponent },
            // { path: 'my/orders', component: MyOrdersComponent },
                        
            { path: 'admin/products/new', component: ProductFormComponent, 
                data: {roles: ["Admin", "ProductManager"]},
                canDeactivate: [ProductForm_PreventUnsavedChanges] 
            },
            { path: 'admin/products/:id', component: ProductFormComponent, 
                data: {roles: ["Admin", "ProductManager"]},
                canDeactivate: [ProductForm_PreventUnsavedChanges] 
            },                 
            { 
                path: 'admin/products', component: AdminProductsComponent, 
                data: {roles: ["Admin", "ProductManager"]}, 
               resolve: {products: AdminProductsResolver} 
            },
            
            { path: 'admin/categories/new', component: CategoryFormComponent, 
                data: {roles: ["Admin", "ProductManager"]},
                canDeactivate: [CategoryForm_PreventUnsavedChanges] 
            },
            { path: 'admin/categories/:id', component: CategoryFormComponent, 
                data: {roles: ["Admin", "ProductManager"]},
                canDeactivate: [CategoryForm_PreventUnsavedChanges] 
            },
            { path: 'admin/categories', component: AdminCategoriesComponent, 
                data: {roles: ["Admin", "ProductManager"]}, 
                resolve: {categories: AdminCategoriesResolver} },

            // { path: 'admin/orders', component: AdminOrdersComponent, 
            //     data: {roles: ["Admin", "OrderManager"]} }
        ]
    },
    
    { path: 'login', component: LoginComponent },    
    { path: '**', redirectTo: '', pathMatch: 'full' } // redirect user to Home
];
