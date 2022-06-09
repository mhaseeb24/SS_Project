import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retailer-page',
  templateUrl: './retailer-page.component.html',
  styleUrls: ['./retailer-page.component.css']
})
export class RetailerPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  go_to_track_product_page()
  {
    this.router.navigateByUrl('/track-product');
  }

  go_to_str_page()
  {
    this.router.navigateByUrl('/sell-to-retailer');
  }


}
