import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../../shared/_services/order.service';
import { Order } from '../../../shared/_models/order';
import { Pagination, PaginatedResult } from '../../../shared/_models/pagination';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/_services/auth.service';
import { AlertifyService } from '../../../shared/_services/alertify.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orderParams: any = {};
  orders: Order[];
  pagination: Pagination;
  subscriptionRoute: Subscription;
  subscriptionOrder: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscriptionRoute = this.route.data.subscribe(data => {      
      this.orders = data['orders'].result;
      this.pagination = data['orders'].pagination;
    });
    
    this.route.queryParamMap.subscribe(params => {
      this.orderParams.userId = this.authService.decodedToken.nameid;
      
      this.loadAllOrders(); 
    });
           
  }

  ngOnDestroy(): void {
    this.subscriptionRoute.unsubscribe();    
    this.subscriptionOrder.unsubscribe();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAllOrders();
  }

  loadAllOrders() {
    this.subscriptionOrder = this.orderService.getAllOrdersByUser(this.pagination.currentPage, this.pagination.itemsPerPage, this.orderParams)
      .subscribe((res: PaginatedResult<Order[]>) => {        
          this.orders = res.result;
          this.pagination = res.pagination;

      }, error => {
        this.alertify.errorMsg(error);
      });
  }

}
