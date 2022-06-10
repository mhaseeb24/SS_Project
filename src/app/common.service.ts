import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './shared/user.model';
import { Tx } from './shared/tx.model';
import { Product } from './shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  selectedUser: User = new User;
  selectedProduct: Product = new Product;
  selectedTx: Tx = new Tx;
  users: User[] = [];
  products: Product[] = [];
  transactions: Tx[] = [];
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
  
  store_transaction(tx)
  {
    return this.http.post(this.baseURL + 'store_transaction', tx);
  }

  get_transaction(id)
  {
    return this.http.post(this.baseURL + 'retrieve_transaction', {id});
  }
}
