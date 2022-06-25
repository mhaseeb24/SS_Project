import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../common.service';
import { User } from '../shared/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private commonService: CommonService, private userService: UserService) {}

  ngOnInit(): void {
  }

  async userLogin(myForm: any)
  {
    var curr_user = new User();
    curr_user.email = myForm.email;
    curr_user.password = myForm.password;


    curr_user.email = 'abc@xyz.com';
    // curr_user.role = 'Farmer';
    curr_user.role = 'Customer';
    this.userService.user.next(curr_user);

    this.commonService.checkUser(curr_user).subscribe((res) =>{
      localStorage.setItem("userLoggedIn", curr_user.email);
      this.userService.user.next(curr_user);
    });
    this.commonService.get_role(curr_user).subscribe((res) =>{
      localStorage.setItem("Role", res);
      curr_user.role = res
      this.userService.user.next(curr_user);
    });
}
}
