import { Component, OnInit } from '@angular/core';
import { Product } from './services/products/products.model';
import { ProductsService } from './services/products/products.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  public products: Product[];

  ngOnInit() {
    this.initialiseProducts();
  }

  private initialiseProducts(): void {
    this.productsService.getProducts()
      .pipe(take(1))
      .subscribe(products => {
        this.products = products;
      });
  }

}
