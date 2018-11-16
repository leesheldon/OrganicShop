import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Product } from '../_models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createNewProduct(userId, product: any) {
    return this.http.post(this.baseUrl + 'products/createNewProduct/' + userId, product);
  }

  deleteProduct(userId, productId) {
    return this.http.delete(this.baseUrl + 'products/' + userId + '/delete/' + productId);
  }

  updateProduct(userId, productId, product) {
    return this.http.put(this.baseUrl + 'products/' + userId + '/update/' + productId, product);
  }

  getProductById(productId) {    
    return this.http.get<Product>(this.baseUrl + 'products/getProductById/' + productId);
  }
  
  getProductsByCategory(categoryId) {
    return this.http.get<Product[]>(this.baseUrl + 'products/getProductsByCategory/' + categoryId);
  }
  
  getAllProducts_Admin(productParams?) {
    let params = new HttpParams();

    if (productParams != null) {
      params = params.append('title', productParams.title);
      params = params.append('categoryId', productParams.categoryId);
      params = params.append('minPrice', productParams.minPrice);
      params = params.append('maxPrice', productParams.maxPrice);      
      params = params.append('orderBy', productParams.orderBy);
    }

    return this.http.get<Product[]>(this.baseUrl + 'products/admin/getAllProducts', { params });
  }  

  getAllProducts(page?, itemsPerPage?, productParams?): Observable<PaginatedResult<Product[]>> {
    const paginatedResult: PaginatedResult<Product[]> = new PaginatedResult<Product[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (productParams != null) {
      params = params.append('title', productParams.title);
      params = params.append('categoryId', productParams.categoryId);
      params = params.append('minPrice', productParams.minPrice);
      params = params.append('maxPrice', productParams.maxPrice);
      params = params.append('orderBy', productParams.orderBy);
    }    
    
    return this.http.get<Product[]>(this.baseUrl + 'products/getAllProducts', { observe: 'response', params })
        .pipe(
          map(res => {
            paginatedResult.result = res.body;
            if (res.headers.get('Pagination') != null) {
              paginatedResult.pagination = JSON.parse(res.headers.get('Pagination'));
            }

            return paginatedResult;
          })
        );
  }

}
