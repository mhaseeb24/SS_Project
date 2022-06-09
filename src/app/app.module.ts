import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MetaModule} from './meta/meta.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ShopComponent } from './shop/shop.component';
import { TrackAnAssetComponent } from './track-an-asset/track-an-asset.component';
import { SupplyChainComponent } from './supply-chain/supply-chain.component';
import { FarmerPageComponent } from './farmer-page/farmer-page.component';
import { ConsumerPageComponent } from './consumer-page/consumer-page.component';
import { DistributorPageComponent } from './distributor-page/distributor-page.component';
import { RetailerPageComponent } from './retailer-page/retailer-page.component';
import { VerifierPageComponent } from './verifier-page/verifier-page.component';
import { AddAProductComponent } from './add-a-product/add-a-product.component';
import { TrackAProductComponent } from './track-a-product/track-a-product.component';
import { BuyAProductComponent } from './buy-a-product/buy-a-product.component';
import { SellToDistributorComponent } from './sell-to-distributor/sell-to-distributor.component';
import { SellToRetailerComponent } from './sell-to-retailer/sell-to-retailer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    AboutUsComponent,
    ShopComponent,
    TrackAnAssetComponent,
    SupplyChainComponent,
    FarmerPageComponent,
    ConsumerPageComponent,
    DistributorPageComponent,
    RetailerPageComponent,
    VerifierPageComponent,
    AddAProductComponent,
    TrackAProductComponent,
    BuyAProductComponent,
    SellToDistributorComponent,
    SellToRetailerComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MetaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
