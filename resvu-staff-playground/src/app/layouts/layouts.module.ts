import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
  declarations: [MainLayoutComponent, AuthLayoutComponent],
  imports: [BrowserModule, RouterModule],
  providers: [],
  bootstrap: [],
})
export class LayoutsModule {}