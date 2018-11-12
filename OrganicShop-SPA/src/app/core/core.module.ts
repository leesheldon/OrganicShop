import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './_components/navbar/navbar.component';
import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import { RegisterComponent } from './_components/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { BsDatepickerModule, BsDropdownModule, ModalModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutes } from '../appRoutes';

@NgModule({
    imports: [
      BrowserModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      ModalModule.forRoot(),
      ButtonsModule.forRoot(),
      PaginationModule.forRoot(),
      RouterModule.forRoot(appRoutes),
    ],
    declarations: [   
        HomeComponent,
        NavbarComponent,
        LoginComponent,
        RegisterComponent
    ],
    exports: [
      NavbarComponent
    ]
  })
  export class CoreModule { }
