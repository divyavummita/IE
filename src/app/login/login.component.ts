import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import * as bcrypt from 'bcryptjs';

import { environment } from 'src/environments/environment';

import { AuthService } from '../_services/auth.service';
import { CustomerService } from '../_services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  @ViewChild('form') form!: NgForm;

  constructor(
    private router: Router,
    private authService: AuthService,
    private customerService: CustomerService
  ) { }

  login(): void {
    if (this.form.valid) {
      const body: any = {
        customerId: this.customerService.customerData?.id,
        username: this.form.value?.username,
        password: this.getHashPassword(this.form.value?.password),
        socialAuth: {
          authToken: null,
          authType: null
        }
      }
      this.authService.loginAsync(body).subscribe(
        res => {
          this.authService.authUserData = res;
          const authToken: string = res.token || null;
          localStorage.setItem('InfinityAuthToken', authToken);
          localStorage.setItem('InfinitySubscriptionKey', res.subscriptionKey);
          this.router.navigateByUrl(`${this.customerService.customerData?.key}/dashboard`);
        },
        err => {
          console.log(err);
        }
      );
    }

  }

  public getHashPassword(str: string): string {
    return bcrypt.hashSync(str, environment.bcryptSecurityKey);
  }
}
