import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './checkout.component';
import { ProductsService } from './services/products/products.service';



@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ProductsService
  ]
})
export class CheckoutModule { }
