import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distributor-page',
  templateUrl: './distributor-page.component.html',
  styleUrls: ['./distributor-page.component.css']
})
export class DistributorPageComponent implements OnInit {
  

  constructor(private router: Router) { }

  ngOnInit() {
  }
  go_to_std_page()
  {
    this.router.navigateByUrl('/sell-to-distributor');
  }

  go_to_track_product_page()
  {
    this.router.navigateByUrl('/track-product');
  }

  go_to_verify_product_page()
  {
    this.router.navigateByUrl('/verify-product')
  }

}
