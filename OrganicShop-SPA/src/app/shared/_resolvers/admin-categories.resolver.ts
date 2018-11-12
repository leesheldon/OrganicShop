import { Injectable } from "@angular/core";
import { Resolve, Router } from "@angular/router";
import { Category } from "../_models/category";
import { CategoryService } from "../_services/category.service";
import { AlertifyService } from "../_services/alertify.service";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class AdminCategoriesResolver implements Resolve<Category[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(
        private categoryService: CategoryService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Category[]> {
        return this.categoryService.getCategories_WithPaging(this.pageNumber, this.pageSize).pipe(
                    catchError(error => {
                        this.alertify.errorMsg('Problem retrieving data.');
                        this.router.navigate(['/home']);
                        return of(null);
                    })
                )
    }

}
