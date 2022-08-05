import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpProxyService } from './http-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerData: any;
  
  constructor(
    private httpProxyService: HttpProxyService
  ) { }

  getByIdAsync(id: string, isPublicUrl: boolean, params?: any): Observable<any> {
    // The isPublicUrl parameter is used to switch between the subscription keys and public Urls
    const url = isPublicUrl ? `public/customers/${id}/null` : `customers/${id}`;
    return this.httpProxyService.getAsync(url, params, isPublicUrl);
  }
}
