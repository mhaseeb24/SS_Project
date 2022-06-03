import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmer-page',
  templateUrl: './farmer-page.component.html',
  styleUrls: ['./farmer-page.component.css']
})
export class FarmerPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  go_to_add_product_page()
  {
    this.router.navigateByUrl('/add-product');
  }

  go_to_track_product_page()
  {
    this.router.navigateByUrl('/track-product');
  }

}
