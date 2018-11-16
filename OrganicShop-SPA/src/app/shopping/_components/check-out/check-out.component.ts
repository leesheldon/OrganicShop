import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shared/_services/shopping-cart.service';
import { Cart } from '../../../shared/_models/cart';
import { AlertifyService } from '../../../shared/_services/alertify.service';
import { Router } from '@angular/router';
import { CartItem } from '../../../shared/_models/cart-item';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cartId: string;
  cart: Cart;
  cartItems: CartItem[];
  cartTotal: number = 0;

  constructor(
    private cartService: ShoppingCartService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    // shopping Cart Items Count
    this.cartId = localStorage.getItem('cartId');
    if (this.cartId) {
      this.cartService.getCartById(this.cartId)
        .subscribe((data: Cart) => {
          this.cart = data;         

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
            
        }, error => {
          this.alertify.errorMsg(error);
        });
    } else {
      this.alertify.warningMsg("Please add item into Cart before going to Check out section!");
      this.router.navigate(['/home']);
    }
  }

}
