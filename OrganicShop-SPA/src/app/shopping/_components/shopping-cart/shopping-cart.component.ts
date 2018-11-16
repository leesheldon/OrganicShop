import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/_models/product';
import { ShoppingCartService } from '../../../shared/_services/shopping-cart.service';
import { AuthService } from '../../../shared/_services/auth.service';
import { AlertifyService } from '../../../shared/_services/alertify.service';
import { Router } from '@angular/router';
import { Cart } from '../../../shared/_models/cart';
import { CartItem } from '../../../shared/_models/cart-item';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartId: string;
  cartItems: CartItem[];
  shoppingCartItemsCount: number;
  items = [];
  products: Product[];
  cartTotal: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    // shopping Cart Items Count
    this.cartId = localStorage.getItem('cartId');
    if (this.cartId) {
      this.cartService.getItemsByCartId(this.cartId)
        .subscribe((data: CartItem[]) => {
          this.cartItems = data;

          if (this.cartItems) {
            for (var i = 0; i < this.cartItems.length; i++) {
              this.cartTotal = this.cartTotal + (this.cartItems[i].product.price * this.cartItems[i].qty);
            }
          }

        }, error => {
          this.alertify.errorMsg(error);
        });
    } else {
      this.alertify.warningMsg("Please add item before going to Shopping Cart section!");
      this.router.navigate(['/home']);
    }

    // let strTotalItems = localStorage.getItem('totalItems');

    // if (!strTotalItems) this.shoppingCartItemsCount = 0;
    // else this.shoppingCartItemsCount = parseFloat(strTotalItems);

    // // shopping Cart Items
    // for (var i = 0; i < localStorage.length; i++){
    //   if (localStorage.key(i) == 'cartId' || 
    //       localStorage.key(i) == 'totalItems' || 
    //       localStorage.key(i) == 'user' || 
    //       localStorage.key(i) == 'token') 
    //     continue;

    //   let strItem = localStorage.getItem(localStorage.key(i));
    //   let item = JSON.parse(strItem);      
    //   this.items.push(item);      
    // }    
  }

  async clearCart() {
    if (this.cartId) {
      if (!confirm('Are you sure you want to delete this shopping cart?')) return;

      await this.cartService.deleteCart(this.authService.decodedToken.nameid, this.cartId)
        .subscribe(data => {
          this.alertify.successMsg('Deleting shopping cart is successful.');

          var tmpUser = localStorage.getItem('user');
          var tmpToken = localStorage.getItem('token');

          localStorage.clear();

          localStorage.setItem('user', tmpUser);
          localStorage.setItem('token', tmpToken);

          this.router.navigate(['/home']);
          
        }, error => {
          this.alertify.errorMsg(error);
        });
    }
  }

}
