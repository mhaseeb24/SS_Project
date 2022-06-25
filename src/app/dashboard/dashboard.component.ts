import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  slideIndex = 1;

  constructor(private router: Router) {
   
   }

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

    
    this.showSlides(this.slideIndex);
}

// Next/previous controls
plusSlides(n) {
  this.showSlides(this.slideIndex += n);
}

// Thumbnail image controls
currentSlide(n) {
  this.showSlides(this.slideIndex = n);
}

showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
  let dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;
  if (n > slides.length) {this.slideIndex = 1}
  if (n < 1) {this.slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[this.slideIndex-1].style.display = "block";
  dots[this.slideIndex-1].className += " active";
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
