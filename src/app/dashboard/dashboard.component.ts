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
