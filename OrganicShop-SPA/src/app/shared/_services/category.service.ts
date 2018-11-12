import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from '../_models/category';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../_models/pagination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createNewCategory(userId: number, category: any) {
    return this.http.post(this.baseUrl + 'categories/createNewCategory/' + userId, category);
  }

  deleteCategory(userId, categoryId) {
    return this.http.delete(this.baseUrl + 'categories/' + userId + '/delete/' + categoryId);
  }

  updateCategory(userId, categoryId, category) {
    return this.http.put(this.baseUrl + 'categories/' + userId + '/update/' + categoryId, category);
  }

  getCategoryById(categoryId) {    
    return this.http.get<Category>(this.baseUrl + 'categories/getCategoryById/' + categoryId);
  }
  
  getCategories_NoPaging() {
    return this.http.get<Category[]>(this.baseUrl + 'categories/GetCategoriesNoPaging');          
  }
  
  getCategories_WithPaging(page?, itemsPerPage?, categoryParams?): Observable<PaginatedResult<Category[]>> {
    const paginatedResult: PaginatedResult<Category[]> = new PaginatedResult<Category[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (categoryParams != null) {
      params = params.append('categoryName', categoryParams.categoryName);
    }

    return this.http.get<Category[]>(this.baseUrl + 'categories/GetCategoriesWithPaging', { observe: 'response', params })
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
