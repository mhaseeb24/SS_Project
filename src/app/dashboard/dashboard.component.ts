import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("Role") == 'Farmer')
    {
      this.router.navigate(['/farmer-page']);
    }
    else if(localStorage.getItem("Role") == 'Distributor')
    {
      this.router.navigate(['/distributor-page']);
    }
    else if(localStorage.getItem("Role") == 'Retailer')
    {
      this.router.navigate(['/retailer-page']);
    }
    else if(localStorage.getItem("Role") == 'Consumer')
    {
      this.router.navigate(['/consumer-page']);
    }
    else if(localStorage.getItem("Role") == 'Verifier')
    {
      this.router.navigate(['/verifier-page']);
    }
  }

  
  go_to_order_scheduling() {
    this.router.navigate(['/order-schedule']);
  }

  show_my_orders(){
    this.router.navigate(['/my-orders']);
  }

  go_to_shop(){
    this.router.navigate(['/shop']);
  }

  go_to_testpage(){
    this.router.navigate(['/testpage']);
  }
}
