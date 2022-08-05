import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpProxyService {
  private apiBaseUrl: string = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getAsync(url: string, params?: any, useProxySubscriptionKey: boolean = false): Observable<any> {
    if (params !== undefined) {
      const options = this.getOptions(params, useProxySubscriptionKey);
      return this.http.get(`${this.apiBaseUrl}/${url}`, options);
    } else {
      const headers = this.getHeaders(useProxySubscriptionKey);
      return this.http.get(`${this.apiBaseUrl}/${url}`, { headers });
    }
  }

  public postAsync(url: string, body: any, params?: any, useProxySubscriptionKey: boolean = false, useFormData: boolean = false): Observable<any> {

    if (params !== undefined) {
      const options = this.getOptions(params, useProxySubscriptionKey, useFormData);
      return this.http.post(`${this.apiBaseUrl}/${url}`, body, options);
    } else {
      const headers = this.getHeaders(useProxySubscriptionKey, useFormData);
      return this.http.post(`${this.apiBaseUrl}/${url}`, body, { headers });
    }
  }

  public putAsync(url: string, body: any, params?: any, useProxySubscriptionKey: boolean = false): Observable<any> {
    if (params !== undefined) {
      const options = this.getOptions(params, useProxySubscriptionKey);
      return this.http.put(`${this.apiBaseUrl}/${url}`, body, options);
    } else {
      const headers = this.getHeaders(useProxySubscriptionKey);
      return this.http.put(`${this.apiBaseUrl}/${url}`, body, { headers });
    }
  }

  public deleteAsync(url: string, params?: any): Observable<any> {
    if (params !== undefined) {
      const options = this.getOptions(params);
      return this.http.delete(`${this.apiBaseUrl}/${url}`, options);
    } else {
      const headers = this.getHeaders();
      return this.http.delete(`${this.apiBaseUrl}/${url}`, { headers });
    }
  }

  public patchAsync(url: string, body: any, params?: any): Observable<any> {
    if (params !== undefined) {
      const options = this.getOptions(params);
      return this.http.patch(`${this.apiBaseUrl}/${url}`, body, options);
    } else {
      const headers = this.getHeaders();
      return this.http.patch(`${this.apiBaseUrl}/${url}`, body, { headers });
    }
  }

  private getHeaders(useProxySubscriptionKey: boolean = false, useFormData: boolean = false): HttpHeaders {
    const subscriptionKey: any = localStorage.getItem('InfinitySubscriptionKey') ? localStorage.getItem('InfinitySubscriptionKey') : '';

    let headers = new HttpHeaders();

    headers = headers.append('Access-Control-Allow-Origin', '*');
    if (!useFormData) { // This is for form io file download control, for it we are passing form data
      headers = headers.append('Content-Type', 'application/json');
    }
    headers = headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers = headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
    headers = headers.append(
      'Ocp-Apim-Subscription-Key',
      useProxySubscriptionKey ? environment.proxySubscriptionKey : subscriptionKey
    );

    const authToken: string = localStorage.getItem('InfinityAuthToken') || '';
    if (authToken) {
      headers = headers.append('Authorization', `Bearer ${authToken}`);
    }
    return headers;
  }

  private getOptions(params?: any, useProxySubscriptionKey: boolean = false, useFormData: boolean = false): any {
    const headers = this.getHeaders(useProxySubscriptionKey, useFormData);
    if (useFormData) { // For getting the progress
      return { headers, ...params }
    } else {
      return { headers, params };
    }
  }
}
