import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../../shared/_models/product';
import { Pagination, PaginatedResult } from '../../../shared/_models/pagination';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../shared/_services/product.service';
import { ShoppingCartService } from '../../../shared/_services/shopping-cart.service';
import { AlertifyService } from '../../../shared/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[];  
  productParams: any = {};
  pagination: Pagination;  
  subscriptionRoute: Subscription;
  subscriptionProduct: Subscription;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {  }

  ngOnInit() {
    this.subscriptionRoute = this.route.data.subscribe(data => {
      this.products = data['products'].result;
      this.pagination = data['products'].pagination;
    });

    this.resetParams();

    this.route.queryParamMap.subscribe(params => {
      this.productParams.categoryId = '';

      if (params.get('categoryId')) {
        this.productParams.categoryId = params.get('categoryId');
      }
      
      this.loadAllProducts();
    });
    
  }

  ngOnDestroy(): void {
    this.subscriptionRoute.unsubscribe();    
    this.subscriptionProduct.unsubscribe();
  }

  resetParams() {
    this.productParams.title = '';
    this.productParams.categoryId = '';
    this.productParams.minPrice = 0.1;
    this.productParams.maxPrice = 99;
    this.productParams.orderBy = 'lastUpdated';
  }

  resetFilters() {
    this.resetParams();

    this.loadAllProducts();    
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.subscriptionProduct = this.productService.getAllProducts(this.pagination.currentPage, this.pagination.itemsPerPage, this.productParams)
      .subscribe((res: PaginatedResult<Product[]>) => {
        this.products = res.result;
        this.pagination = res.pagination;

    }, error => {
      this.alertify.errorMsg(error);
    });    
  }

}
