import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/_models/product';
import { ProductService } from '../../../shared/_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../../shared/_services/alertify.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[];
  filteredProducts: Product[];  
  productParams: any = {};
  
  constructor(
    private productService: ProductService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productParams.title = '';
    this.productParams.categoryId = '';
    this.productParams.minPrice = 1;
    this.productParams.maxPrice = 99;
    this.productParams.orderBy = 'lastUpdated';

    this.loadAllProducts();
  }

  resetFilters() {
    this.productParams.title = '';
    this.productParams.categoryId = '';
    this.productParams.minPrice = 1;
    this.productParams.maxPrice = 99;

    this.loadAllProducts();
  }

  loadAllProducts() {    
    this.productService.getAllProducts_Admin(this.productParams)
          .subscribe(products => {
              this.products = null;
              this.products = products;
          }, error => {
            this.alertify.errorMsg(error);
          });    
  }

}
