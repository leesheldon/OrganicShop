import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../_models/order';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createNewOrder(userId, order: any) {
    return this.http.post(this.baseUrl + 'orders/createNewOrder/' + userId, order);
  }

  getAllOrdersByUser(page?, itemsPerPage?, orderParams?): Observable<PaginatedResult<Order[]>> {
    const paginatedResult: PaginatedResult<Order[]> = new PaginatedResult<Order[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (orderParams != null) {
      params = params.append('userId', orderParams.userId);
    }    
    
    return this.http.get<Order[]>(this.baseUrl + 'orders/getAllOrdersByUser', { observe: 'response', params })
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
