import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { MetamaskService } from '../metamask.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [CommonService]
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, public commonService: CommonService, public metamask: MetamaskService) {
  }


  ngOnInit(): void {
    this.metamask.watchAccount();
  }


  // Add user to the database

  async addUser(formObj: NgForm) {
    this.metamask.watchAccount();
    this.commonService.selectedUser.address = this.metamask.model.account;
    console.log(`address is : ${this.metamask.model.account}`);
    this.commonService.createUser(this.commonService.selectedUser).subscribe((res) => {
      console.log('User added to database');
      localStorage.setItem("userLoggedin", this.commonService.selectedUser.email);
    })
  }
}
  


