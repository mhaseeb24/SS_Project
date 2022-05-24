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

const routes: Routes = [
  {path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'track-an-asset', component: TrackAnAssetComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'testpage', component: SupplyChainComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
