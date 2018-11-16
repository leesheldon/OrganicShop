import { Component, OnInit, Input } from '@angular/core';
import { Cart } from '../../../shared/_models/cart';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from '../../../shared/_services/alertify.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Order } from '../../../shared/_models/order';
import { CartItem } from '../../../shared/_models/cart-item';
import { OrderDetails } from '../../../shared/_models/order-details';
import { OrderService } from '../../../shared/_services/order.service';
import { AuthService } from '../../../shared/_services/auth.service';
import { ShoppingCartService } from '../../../shared/_services/shopping-cart.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart: Cart;
  @Input('cartItems') cartItems: CartItem[];  
  @Input('cartTotal') cartTotal: number;
  shippingForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  order: Order;  
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private cartService: ShoppingCartService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-green'
    };
    
    this.createShippingForm();
  }

  createShippingForm() {
    this.shippingForm = this.fb.group({
      username: ['', Validators.required],
      dateOfReceiving: [null, Validators.required],
      addressline1: ['', Validators.required],
      addressline2: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      comments: ['', null]
    });
  }

  async placeOrder() {
    if (this.shippingForm.valid) {
      var orderVals = Object.assign({}, this.shippingForm.value);
      
      var detailsList = [];
      for (var i = 0; i < this.cartItems.length; i++)
      {
        detailsList.push(
          {
            productId: this.cartItems[i].productId,
            qty: this.cartItems[i].qty
          }
        );
      }

      var orderForSaving = {
        userName: orderVals.username,
        addressline1: orderVals.addressline1,
        addressline2: orderVals.addressline2,
        city: orderVals.city,
        country: orderVals.country,
        comments: orderVals.comments,
        dateOfReceiving: orderVals.dateOfReceiving,        
        orderDetails: detailsList,
        orderTotal: this.cartTotal.toString()
      };

      await this.orderService.createNewOrder(this.authService.decodedToken.nameid, orderForSaving)
          .subscribe(data => {
            this.alertify.successMsg('Creating new Order is successful.');

            this.cartService.deleteCart(this.authService.decodedToken.nameid, this.cart.id)
              .subscribe(data => {
                
                var tmpUser = localStorage.getItem('user');
                var tmpToken = localStorage.getItem('token');

                localStorage.clear();

                localStorage.setItem('user', tmpUser);
                localStorage.setItem('token', tmpToken);

                this.router.navigate(['/home']);
                
              }, error => {
                this.alertify.errorMsg(error);
              });

          }, error => {
            this.alertify.errorMsg(error);
          }, () => {
            this.router.navigate(['/order-success']);
          });

    }
  }

  cancelPlaceOrder() {
    this.router.navigate(['/home']);
  }

}
