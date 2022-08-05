import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpProxyService } from './http-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUserData!: any;

  constructor(
    private httpProxyService: HttpProxyService
  ) { }

  public loginAsync(body: any, params?: any): Observable<any> {
    const url = `users/auth`;
    return this.httpProxyService.postAsync(url, body, params, true);
  }
}
