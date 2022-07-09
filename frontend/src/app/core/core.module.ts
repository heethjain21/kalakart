import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
    ])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    ContactUsComponent,        
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
