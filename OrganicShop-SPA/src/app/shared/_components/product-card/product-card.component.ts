import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../_models/product';
import { Cart } from '../../_models/cart';
import { AlertifyService } from '../../_services/alertify.service';
import { ShoppingCartService } from '../../_services/shopping-cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { CartItem } from '../../_models/cart-item';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-AddToCart') showAddToCart = true;
  @Input('item-Qty') itemQty: any;
  
  qty: number;

  constructor(
    private cartService: ShoppingCartService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.qty = this.cartService.getQuantity(this.product.id);
  }

  async addToCart() {
    if (!this.authService.loggedIn()) {
      // User does not log in yet.
      this.alertify.errorMsg('Please log in before shopping!');
      this.router.navigate(['/login']);
      return false;
    }
    
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {

      // create new cart
      await this.cartService.createNewCart(this.authService.decodedToken.nameid, this.product.id)
        .subscribe((cart: Cart) => {
          localStorage.setItem('cartId', cart.id);         

          this.setQty(this.product, 'plus');

          localStorage.removeItem('totalItems');
          localStorage.setItem('totalItems', this.qty.toString());

        }, error => {
          this.alertify.errorMsg('Error in creating shopping cart!');
        }
      );
    } else {
      // Update Item's Qty to current Shopping Cart
      this.setQuantityAndupdateItem(this.product, 'plus');
    }        
 }

  setQuantity(product: Product, action: string) {
    this.setQuantityAndupdateItem(product, action);
  }

  setQuantityAndupdateItem(product: Product, action: string) {
    this.setQty(product, action);
    
    let cartId = localStorage.getItem('cartId');
    this.updateItem(cartId, product.id, action);    
  }

  setQty(product: Product, action: string) {
    this.qty = this.cartService.setQuantity(product, action);
  }

  updateItem(cartId: string, productId: string, action: string) {
    this.cartService.updateCartItem(this.authService.decodedToken.nameid, cartId, productId, action)
        .subscribe(data => {
          this.cartService.getItemsByCartId(cartId)
            .subscribe((cartItems: CartItem[]) => {          
              localStorage.removeItem('totalItems');
              localStorage.setItem('totalItems', cartItems.length.toString());

            }, error => {
              this.alertify.errorMsg(error);
            });

        }, error => {
          this.alertify.errorMsg(error);
        });
  }
  
}
