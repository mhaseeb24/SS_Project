import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../common.service';
//import { User } from '../shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private commonService: CommonService) {}

  ngOnInit(): void {
  }

  // userLogin(myForm: any)
  // {
  //   // this.http.post('http://localhost:3000/api/register', ).subscribe(res => {
  //   //   const user = res.find((a: any) => {
  //   //     return a.email == myForm.email && a.password == myForm.password
  //   //   });
  //   //var curr_user = new User();
  //   curr_user.email = myForm.email;
  //   curr_user.password = myForm.password;
  //   this.commonService.checkUser(curr_user).subscribe((res) =>{
  //     localStorage.setItem("userLoggedIn", curr_user.email)
  //     console.log("Successfully Logged in");
  //     this.commonService.isUserVerified(curr_user).subscribe((res) => {
  //       this.router.navigateByUrl('/dashboard');
  //       return;
  //     })
  //     localStorage.setItem("userLoggedIn", curr_user.email)
  //     this.router.navigateByUrl('/otp-verification');
  //   });
  //   //   if(user)
  //   //   {
  //   //     this.router.navigate(['/dashboard']);
  //   //   }

  //   //   else
  //   //   {
  //   //     alert("Login Failed! Please enter the correct details");
  //   //   }
  //   // })
  // }

}
