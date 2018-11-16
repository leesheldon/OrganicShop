import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Order } from "../_models/order";
import { AlertifyService } from "../_services/alertify.service";
import { OrderService } from "../_services/order.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class OrdersResolver implements Resolve<Order[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(
        private orderService: OrderService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Order[]> {
        return this.orderService.getAllOrdersByUser(this.pageNumber, this.pageSize).pipe(
                    catchError(error => {
                        this.alertify.errorMsg('Problem retrieving data.');
                        this.router.navigate(['/home']);
                        return of(null);
                    })
                )
    }

}
