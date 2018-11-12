import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../../shared/_services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../../shared/_models/category';
import { Product } from '../../../shared/_models/product';
import { ProductService } from '../../../shared/_services/product.service';
import { AlertifyService } from '../../../shared/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../shared/_services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[];
  product: Product = null;
  productId: string;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.productForm.dirty)
      $event.returnValue = true;
  }

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.createProductForm();

    this.loadCategories();
        
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.getProductById(this.productId)
        .subscribe(p => {
          this.product = p;

          // this.productForm.controls['title'].setValue(this.product.title);
          // this.productForm.controls['price'].setValue(this.product.price);
          // this.productForm.controls['category'].setValue(this.product.category.id);
          // this.productForm.controls['photoUrl'].setValue(this.product.photoUrl);

          this.productForm.setValue({
            title: this.product.title,
            price: this.product.price,
            category: this.product.category.id,
            photoUrl: this.product.photoUrl
          });

        });
    }
  }

  ngOnInit() {
    
  }

  loadCategories() {
    this.categoryService.getCategories_NoPaging()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      }, error => {
        this.alertify.errorMsg(error);
      });
  }

  createProductForm() {
    const urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: [null, Validators.required],
      photoUrl: ['', [Validators.required, Validators.pattern(urlPattern)]]
    });
  }

  save() {
    if (this.productForm.valid) {
      var pp = Object.assign({}, this.productForm.value);
      var productForSaving = {
        title: pp.title,
        categoryId: pp.category,
        photoUrl: pp.photoUrl,
        price: pp.price
      };

      if (this.productId) {
        this.productService.updateProduct(this.authService.decodedToken.nameid, this.productId, productForSaving)
          .subscribe(data => {
            this.alertify.successMsg('Updating product is successful.');
          }, error => {
            this.alertify.errorMsg(error);
          }, () => {
            this.productForm.reset();
            this.router.navigate(['/admin/products']);
          });
      }
      else {        
        this.productService.createNewProduct(this.authService.decodedToken.nameid, productForSaving)
          .subscribe(data => {
            this.alertify.successMsg('Creating new product is successful.');            
          }, error => {
            this.alertify.errorMsg(error);
          }, () => {
            this.productForm.reset();
            this.router.navigate(['/admin/products']);
          });
      }
    }
  }

  deleteProduct() {
    if (this.productId) {
      if (!confirm('Are you sure you want to delete this product?')) return;

      this.productService.deleteProduct(this.authService.decodedToken.nameid, this.productId)
        .subscribe(data => {
          this.alertify.successMsg('Deleting product is successful.');
        }, error => {
          this.alertify.errorMsg(error);
        }, () => {
          this.productForm.reset();
          this.router.navigate(['/admin/products']);
        });
    }       
  }

}
