import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './shared/user.model';
import { Product } from './shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  selectedUser: User = new User;
  selectedProduct: Product = new Product;
  users: User[] = [];
  products: Product[] = [];
  readonly baseURL = "http://localhost:3000/api/";

  constructor(private http: HttpClient) { }

  createUser(user: User){
    return this.http.post(this.baseURL + 'register', user);
  }

  get_role(user: User){
    return this.http.post(this.baseURL + 'get_role', user,{responseType: 'text'});
  }

  checkUser(user: User){
    return this.http.post(this.baseURL + 'authenticate', user);
  }

  get_name_from_address(user: User){
    return this.http.post(this.baseURL + 'get_name_from_address', user,{responseType: 'text'});
  }
}
