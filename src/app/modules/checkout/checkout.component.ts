import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('promoCode', { static: true }) promoCodeInput: ElementRef;
  public products: Product[];
  public promoCode: string;
  public orderTotal = 0;
  public order: Order = {
    products: []
  };

  ngOnInit() {
    this.promoCode = this.promoCodeInput.nativeElement.value;
    this.initialiseProducts();
    this.promotionService.getPromotionCodes();
  }

  public onQtyChange(id: string, qty: string): void {
    this.order = this.orderService.updateOrder(id, parseInt(qty, 10));
  }

  public getSubtotalForId(id: string): number {
    const currentProduct = this.order.products.find(product => product.id === id);
    const currentProductPrice = this.products.find(product => product.id === id).price;

    return currentProduct ? currentProduct.qty * currentProductPrice : 0;
  }

  public onPromoCodeChange(): void {
    this.promoCode = this.promoCodeInput.nativeElement.value;
  }

  public applyPromoCode(): void {
    if (this.promoCode && this.promotionService.isPromoValid(this.promoCode, this.order, this.products)) {
      this.orderTotal = this.promotionService.getUpdatedOrderTotal(this.promoCode, this.order, this.products);
    }
  }

  private initialiseProducts(): void {
    this.productsService.getProducts()
      .pipe(take(1))
      .subscribe(products => {
        this.products = products;
      });
  }

}
