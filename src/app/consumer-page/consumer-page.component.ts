import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consumer-page',
  templateUrl: './consumer-page.component.html',
  styleUrls: ['./consumer-page.component.css']
})
export class ConsumerPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  go_to_track_product_page()
  {
    this.router.navigateByUrl('/track-product');
  }

  go_to_buy_product_page()
  {
    this.router.navigateByUrl('/buy-a-product');
  }

  go_to_verify_page()
  {
    this.router.navigateByUrl('/verify');
  }

}
