import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'shared/models/app-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loadingText = '.';
  appUser: AppUser;
  constructor(private auth: AuthService) {
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      if (!appUser) {
        setTimeout(() => {
          this.auth.login();
        }, 600);
      }
    });
  }

  ngOnInit() {
    // This is for preloader i.e keep on repeating '.', '..', '...', '....' 
    let i = 1;
    setInterval(() => {
      this.loadingText = '.'.repeat(i);
      i++;
      if (i === 5) 
        i = 1;
    }, 250);
  }

}
