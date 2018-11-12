import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertifyService } from '../../../shared/_services/alertify.service';
import { AuthService } from '../../../shared/_services/auth.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../../../shared/_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegisterEvt = new EventEmitter();  
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-green'
    };

    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      email: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  cancelRegister() {
    this.cancelRegisterEvt.emit(false);
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      
      this.authService.register(this.user).subscribe(() => {
        this.alertify.successMsg('Registration successfull.');
      }, error => {
        this.alertify.errorMsg(error);
      }, () => {
        var model: any = {};
        model.loginname = this.registerForm.get('username').value;
        model.password = this.registerForm.get('password').value;
        
        this.authService.login(model).subscribe(() => {
          this.router.navigate(['/home']);
        });
      });
    }
    
  }

}
