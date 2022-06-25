import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLoggedIn: boolean = false;
  userRole:string;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userLoggedIn = !!localStorage.getItem("userLoggedIn");
    console.log('userLoggedIn',this.userLoggedIn);

    this.userService.user.subscribe((u)=>{
      this.userLoggedIn = !!u;
      if(this.userLoggedIn) this.userRole = u.role;
    })
  }

  display_login = () => {
    this.router.navigateByUrl('/login')
  }

  logout = () => {
    this.userService.logout();
  }

}
