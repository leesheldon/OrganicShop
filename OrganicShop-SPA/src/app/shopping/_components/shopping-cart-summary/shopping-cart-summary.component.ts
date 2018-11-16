import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from '../../../shared/_models/cart-item';
import { Cart } from '../../../shared/_models/cart';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('cartItems') cartItems: CartItem[];  
  @Input('cartTotal') cartTotal: number;
  cartId: string;
  shoppingCartItemsCount: number;
  items = [];

  constructor() { }

  ngOnInit() {
    
    // // shopping Cart Items Count
    // this.cartId = localStorage.getItem('cartId');
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

}
