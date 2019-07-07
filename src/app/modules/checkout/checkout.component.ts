import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { ProductsService } from './services/products/products.service';
import { PromotionService } from './services/promotion/promotion.service';
import { OrderService } from './services/order/order.service';

import { Order } from './services/order/order.model';
import { Product } from './services/products/products.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
    private promotionService: PromotionService,
    private orderService: OrderService,
  ) { }

  public products: Product[];
  public order: Order = {
    products: []
  };

  ngOnInit() {
    this.initialiseProducts();
    this.promotionService.getPromotionCode();
  }

  public onQtyChange(id: string, qty: string): void {
    this.order = this.orderService.updateOrder(id, parseInt(qty, 10));
  }

  public getSubtotalForId(id: string): number {
    const currentProduct = this.order.products.find(product => product.id === id);
    const currentProductPrice = this.products.find(product => product.id === id).price;

    return currentProduct ? currentProduct.qty * currentProductPrice : 0;
  }

  private initialiseProducts(): void {
    this.productsService.getProducts()
      .pipe(take(1))
      .subscribe(products => {
        this.products = products;
      });
  }

}
