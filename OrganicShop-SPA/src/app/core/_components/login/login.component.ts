import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/_services/auth.service';
import { AlertifyService } from '../../../shared/_services/alertify.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  registerMode = false;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.successMsg('Logged in successfully!');
    }, error => {
      this.alertify.errorMsg('Failed to login!');
    }, () => {
      this.router.navigate(['/home']);
    });
  }
  
  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(modeEventFromRegister: boolean) {
    this.registerMode = modeEventFromRegister;
  }

}
