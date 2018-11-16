import { CartItem } from './../_models/cart-item';
import { Injectable } from '@angular/core';
import { Product } from '../_models/product';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../_models/cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getQuantity(productId: string) {
    let qty = 0;
    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      qty = 0;
    } else {
      let strItem = localStorage.getItem(productId);

      if (!strItem) {
        qty = 0;
      } else {
        let item = JSON.parse(strItem);
        qty = item.qty;
      }
    }

    return qty;
  }

  increaseTotalItems(totalItems: string) {
    let total = parseFloat(totalItems);
    total = total + 1;

    localStorage.removeItem('totalItems');
    localStorage.setItem('totalItems', total.toString());
  }

  decreaseTotalItems(totalItems: string) {
    let total = parseFloat(totalItems);
    total = total - 1;

    localStorage.removeItem('totalItems');

    if (total > 0) localStorage.setItem('totalItems', total.toString());    
  }

  setQuantity(product: Product, action: string) {
    let qty = 0;
    let strItem = localStorage.getItem(product.id);
    let jsonProduct = {
      title: product.title,
      price: product.price,
      qty: 0
    };

    if (!strItem) {
      jsonProduct.qty = 1;
      qty = 1;      
      localStorage.setItem(product.id, JSON.stringify(jsonProduct));

      let totalItems = localStorage.getItem('totalItems');
      if (!totalItems) {
        localStorage.setItem('totalItems', '1');
      } else {
        this.increaseTotalItems(totalItems);
      }
    } else {
      let item = JSON.parse(strItem);
      let oldQty = item.qty;

      if (action === 'plus') {
        qty = oldQty + 1;
        jsonProduct.qty = qty;

        localStorage.removeItem(product.id);
        localStorage.setItem(product.id, JSON.stringify(jsonProduct));
      }
      else {
        qty = oldQty - 1;
        jsonProduct.qty = qty;

        localStorage.removeItem(product.id);
        if (qty > 0) {
          localStorage.setItem(product.id, JSON.stringify(jsonProduct));          
        }
        else {
          let totalItems = localStorage.getItem('totalItems');
          this.decreaseTotalItems(totalItems);
        }
      }
    }

    return qty;
  }

  getCartById(cartId) {
    return this.http.get<Cart>(this.baseUrl + 'carts/getCartById/' + cartId);
  }

  createNewCart(userId, productId: string) {
    var today = new Date();
    
    var cartForCreating = {
      userId: userId,
      productId: productId,
      dateCreated: today,
      lastUpdated: today
    };    

    return this.http.post(this.baseUrl + 'carts/createNewCart', cartForCreating);
  }

  deleteCart(userId, cartId) {
    return this.http.delete(this.baseUrl + 'carts/' + userId + '/delete/' + cartId);
  }
  
  updateCartItem(userId, cartId, productId, action: string) {
    var itemForUpdating = {
      productId: productId,
      action: action
    };

    return this.http.put(this.baseUrl + 'carts/' + userId + '/updateItem/' + cartId, itemForUpdating);
  }

  getItemsByCartId(cartId) {
    return this.http.get<CartItem[]>(this.baseUrl + 'carts/getItemsByCart/' + cartId);
  }
  
}
