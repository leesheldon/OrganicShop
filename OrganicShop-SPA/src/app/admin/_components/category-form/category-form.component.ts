import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../../shared/_models/category';
import { Product } from '../../../shared/_models/product';
import { AuthService } from '../../../shared/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../../shared/_services/alertify.service';
import { CategoryService } from '../../../shared/_services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId: string;
  category: Category = null;
  products: Product[];

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.categoryForm.dirty)
      $event.returnValue = true;
  }

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createCategoryForm();

    this.categoryId = this.route.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.categoryService.getCategoryById(this.categoryId)
        .subscribe(p => {
          this.category = p;          

          this.categoryForm.setValue({
            categoryName: this.category.categoryName
          });
      });
    }
  }

  createCategoryForm() {
    const urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required]
    });
  }

  deleteCategory() {
    if (this.categoryId) {
      if (!confirm('Are you sure you want to delete this category?')) return;

      this.categoryService.deleteCategory(this.authService.decodedToken.nameid, this.categoryId)
                  .subscribe(data => {
                    this.alertify.successMsg('Deleting category is successful.');
                  }, error => {
                    this.alertify.errorMsg(error);
                  }, () => {
                    this.categoryForm.reset();
                    this.router.navigate(['/admin/categories']);
                  });
    }
  }

  save() {
    if (this.categoryForm.valid) {
      var val = Object.assign({}, this.categoryForm.value);
      var categoryForSaving = {
        categoryName: val.categoryName
      };

      if (this.categoryId) {
        this.categoryService.updateCategory(this.authService.decodedToken.nameid, this.categoryId, categoryForSaving)
          .subscribe(data => {
            this.alertify.successMsg('Updating category is successful.');
          }, error => {
            this.alertify.errorMsg(error);
          }, () => {
            this.categoryForm.reset();
            this.router.navigate(['/admin/categories']);
          });
      }
      else {        
        this.categoryService.createNewCategory(this.authService.decodedToken.nameid, categoryForSaving)
          .subscribe(data => {
            this.alertify.successMsg('Creating new category is successful.');            
          }, error => {
            this.alertify.errorMsg(error);
          }, () => {
            this.categoryForm.reset();
            this.router.navigate(['/admin/categories']);
          });
      }
    }
  }
  
}
