import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Customer } from './response/customer';
import { Customer as Request } from './request/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  protected base: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.base = 'http://adi-server.herokuapp.com/';
  }

  public index() {
    const suffix = 'customers.json';
    const header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.auth.currentUser().token
      })
    };
    return this.http.get<Customer[]>(this.base + suffix, header);
  }

  public create(request: Request) {
    const suffix = `customers.json`;
    const header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.auth.currentUser().token
      })
    };
    return this.http.post<Customer>(this.base + suffix, request, header);
  }

  public show(phone: string) {
    const suffix = `customers/${phone}.json`;
    const header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.auth.currentUser().token
      })
    };
    return this.http.get<Customer>(this.base + suffix, header);
  }

  // public update(product: Product, request: Request) {
  //   const suffix = `products/${product.code}.json`;
  //   const header = {
  //     headers: new HttpHeaders({
  //       'Content-type': 'application/json',
  //       'token': this.auth.currentUser().token
  //     })
  //   };
  //   return this.http.patch<Product>(this.base + suffix, request, header);
  // }

  // public destroy(product: Product) {
  //   const suffix = `products/${product.code}.json`;
  //   const header = {
  //     headers: new HttpHeaders({
  //       'Content-type': 'application/json',
  //       'token': this.auth.currentUser().token
  //     })
  //   };
  //   return this.http.delete<Product>(this.base + suffix, header);
  // }
}
