import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private location: Location) { }

  ngOnInit(): void {
    this.userService.user.subscribe((user)=>{

      let url = '/dashboard';
      console.log('user',user);
      if(user){

        switch (user.role) {
          case 'Farmer':
            url = '/farmer-page'
            break;

            case 'Distributor':
            url = '/distributor-page'
            break;

            case 'Retailer':
            url = '/retailer-page'
            break;

            case 'Consumer':
            url = '/consumer-page'
            break;

            case 'Verifier':
              url = '/verifier-page'
              break;

          default:
            break;
        }
      }
      else{
        if(this.location.path().split('?')[0] == '/signup') url = '/signup'
      }
      this.router.navigate([url])
    });
  }
}
