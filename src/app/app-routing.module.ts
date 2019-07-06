import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './modules/checkout/checkout.component';


const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: '**',
    redirectTo: 'checkout'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
