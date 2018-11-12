import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/_services/auth.service';
import { AlertifyService } from '../../../shared/_services/alertify.service';
import { ShoppingCartService } from '../../../shared/_services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  get shoppingCartItemsCount(): number {
    let strTotalItems = localStorage.getItem('totalItems');
    if (!strTotalItems) return 0;
    else return parseFloat(strTotalItems);
  };

  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private alertify: AlertifyService,
    private router: Router
  ) {  }

  ngOnInit() {
    // let strTotalItems = localStorage.getItem('totalItems');
    // if (!strTotalItems) this.shoppingCartItemsCount = 0;
    // else this.shoppingCartItemsCount = parseFloat(strTotalItems);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;

    this.alertify.normalMsg('Logged out!');

    this.router.navigate(['/home']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
