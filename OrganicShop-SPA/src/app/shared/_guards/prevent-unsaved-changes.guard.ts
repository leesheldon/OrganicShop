import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CategoryFormComponent } from '../../admin/_components/category-form/category-form.component';
import { ProductFormComponent } from '../../admin/_components/product-form/product-form.component';

@Injectable()
export class ProductForm_PreventUnsavedChanges implements CanDeactivate<ProductFormComponent> {
    canDeactivate(component: ProductFormComponent) {
        if (component.productForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
        }    

        return true;
    }   
}

export class CategoryForm_PreventUnsavedChanges implements CanDeactivate<CategoryFormComponent> {
    canDeactivate(component: CategoryFormComponent) {
        if (component.categoryForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
        }      

        return true;
    }   
}
