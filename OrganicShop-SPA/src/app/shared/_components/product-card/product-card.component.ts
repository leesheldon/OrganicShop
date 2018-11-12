import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../_models/product';
import { Cart } from '../../_models/cart';
import { AlertifyService } from '../../_services/alertify.service';
import { ShoppingCartService } from '../../_services/shopping-cart.service';


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
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.qty = this.cartService.getQuantity(this.product.id);
  }

  async addToCart() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {

      // create new cart
      await this.cartService.createNewCart()
      .subscribe((cart: Cart) => {
        localStorage.setItem('cartId', cart.id);

      }, error => {

      }, () => {
        this.setQuantity(this.product, 'plus');

        
      });
    } else {
      this.setQuantity(this.product, 'plus');
    }        
 }

  setQuantity(product: Product, action: string) {
    this.qty = this.cartService.setQuantity(product, action);
  }
  
}
