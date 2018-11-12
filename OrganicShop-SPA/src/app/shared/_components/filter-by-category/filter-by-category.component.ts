import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../_models/category';
import { AlertifyService } from '../../_services/alertify.service';
import { CategoryService } from '../../_services/category.service';

@Component({
  selector: 'app-filter-by-category',
  templateUrl: './filter-by-category.component.html',
  styleUrls: ['./filter-by-category.component.css']
})
export class FilterByCategoryComponent implements OnInit {
  @Input() paramCategoryId;
  categories: Category[];

  constructor(
    private alertify: AlertifyService,
    private categoryService: CategoryService,
  ) { 
    this.loadAllCategories();
  }

  ngOnInit() {    
  }

  loadAllCategories() {
    this.categoryService.getCategories_NoPaging()
      .subscribe(categories => {
        this.categories = categories;
      }, error => {
        this.alertify.errorMsg(error);
      });
  }
  
}
