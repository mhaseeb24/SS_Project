import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from './auth/authentication.guard';
import { Authentication2Guard } from './auth/authentication2.guard';
import { ShopComponent } from './shop/shop.component';
import { TrackAnAssetComponent } from './track-an-asset/track-an-asset.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SupplyChainComponent } from './supply-chain/supply-chain.component';
import { FarmerPageComponent } from './farmer-page/farmer-page.component';
import { DistributorPageComponent } from './distributor-page/distributor-page.component';
import { RetailerPageComponent } from './retailer-page/retailer-page.component';
import { ConsumerPageComponent } from './consumer-page/consumer-page.component';
import { VerifierPageComponent } from './verifier-page/verifier-page.component';
import { AddAProductComponent } from './add-a-product/add-a-product.component';
import { TrackAProductComponent } from './track-a-product/track-a-product.component';
import { BuyAProductComponent } from './buy-a-product/buy-a-product.component';
import { SellToDistributorComponent } from './sell-to-distributor/sell-to-distributor.component';
import { SellToRetailerComponent } from './sell-to-retailer/sell-to-retailer.component';
import { VerificationPageComponent } from './verification-page/verification-page.component';

const routes: Routes = [
  {path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'track-an-asset', component: TrackAnAssetComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'testpage', component: SupplyChainComponent},
  {path: 'farmer-page', component: FarmerPageComponent},
  {path: 'distributor-page', component: DistributorPageComponent},
  {path: 'retailer-page', component: RetailerPageComponent},
  {path: 'consumer-page', component: ConsumerPageComponent},
  {path: 'verifier-page', component: VerifierPageComponent},
  {path: 'add-product', component: AddAProductComponent},
  {path: 'track-product', component: TrackAProductComponent},
  {path: 'buy-a-product', component: BuyAProductComponent},
  {path: 'sell-to-distributor', component: SellToDistributorComponent},
  {path: 'sell-to-retailer', component: SellToRetailerComponent},
  {path: 'verify', component: VerificationPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
