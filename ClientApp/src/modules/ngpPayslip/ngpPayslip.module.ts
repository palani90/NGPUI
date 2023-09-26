import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NGPPayslipRoutingModule } from './ngpPayslip-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CustomOverlayModule } from '../shared/custom-overlay/custom-overlay/custom-overlay.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NGPPayslipRoutingModule,
    SharedModule,
    CustomOverlayModule.forRoot()
  ]
})
export class UsecaseviewModule { }
