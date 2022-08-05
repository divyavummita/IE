import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpProxyService } from './http-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor(private httpProxy: HttpProxyService) { }
  public listAsync(params?: any): Observable<any> {
    const url = `institutions`;
    return this.httpProxy.getAsync(url, params);
}
}
