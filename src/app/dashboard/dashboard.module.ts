import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LayoutComponent, LoginComponent],
  imports: [CommonModule, DashboardRoutingModule, ReactiveFormsModule],
  exports: [LayoutComponent],
})
export class DashboardModule {}
