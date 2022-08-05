import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpProxyService } from './http-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class UserlistService {

  constructor(private httpProxy: HttpProxyService) { }
  public listAsync(params?: any): Observable<any> {
    const url = `users`;
    return this.httpProxy.getAsync(url, params);
}
public postAsync(body: any, params?: any): Observable<any> {
  const url = `users`;
  return this.httpProxy.postAsync(url, body, params);
}

public putAsync(id: string, body: any, params?: any): Observable<any> {
  const url = `users/${id}`;
  return this.httpProxy.putAsync(url, body, params);
}

public getByIdAsync(id: string, params?: any): Observable<any> {
  const url = `users/${id}`;
  return this.httpProxy.getAsync(url, params);
}

public deleteAsync(id: string, params?: any): Observable<any> {
  const url = `users/${id}`;
  return this.httpProxy.deleteAsync(url, params);
}

}
