import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<User | null>(null);

  constructor() { }

  logout(){
    this.user.next(null);
    localStorage.clear();
  }
}
