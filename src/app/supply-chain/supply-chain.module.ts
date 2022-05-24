import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplyChainComponent } from './supply-chain.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { UtilModule } from '../util/util.module';



@NgModule({
  declarations: [SupplyChainComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    RouterModule,
    UtilModule
  ],
  exports: [SupplyChainComponent]
})
export class SupplyChainModule { }
