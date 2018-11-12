import { Component, OnInit } from '@angular/core';
import { PaginatedResult, Pagination } from '../../../shared/_models/pagination';
import { Category } from '../../../shared/_models/category';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../shared/_services/category.service';
import { AlertifyService } from '../../../shared/_services/alertify.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[];
  categoryParams: any = {};
  pagination: Pagination;

  constructor(
    private categoryService: CategoryService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.categories = data['categories'].result;
      this.pagination = data['categories'].pagination;
    });
    
    this.categoryParams.categoryName = '';

    this.loadAllCategories();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAllCategories();
  }
  

  loadAllCategories() {
    this.categoryService.getCategories_WithPaging(this.pagination.currentPage, this.pagination.itemsPerPage, this.categoryParams)
      .subscribe((res: PaginatedResult<Category[]>) => {
        this.categories = res.result;
        this.pagination = res.pagination;
    }, error => {
      this.alertify.errorMsg(error);
    });
    
  }  

}
