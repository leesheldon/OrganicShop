import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Product } from "../_models/product";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ProductService } from "../_services/product.service";
import { AlertifyService } from "../_services/alertify.service";

@Injectable()
export class AdminProductsResolver implements Resolve<Product[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(
        private productService: ProductService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
        return this.productService.getAllProducts(this.pageNumber, this.pageSize).pipe(
                    catchError(error => {
                        this.alertify.errorMsg('Problem retrieving data.');
                        this.router.navigate(['/home']);
                        return of(null);
                    })
                )
    }

}
