import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../order/order.service';
import { Order } from '../order/order.model';
import { Product } from '../products/products.model';
import { PromotionResponse, PromoType, Promotion, OrderTotalDiscountRules, ProductDiscountRules } from './promotion.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private http: HttpClient,
    private orderService: OrderService
  ) { }

  private promotionResponse: PromotionResponse;
  private availablePromotions: string[] = [];

  public getPromotionCodes(): void {
    this.http.get<PromotionResponse>('//localhost:3000/promotions', { withCredentials: true })
      .subscribe(response => {
        this.promotionResponse = response;
        this.promotionResponse.promotions.forEach((promotion) => {
          this.availablePromotions.push(promotion.code);
        });
      });
  }

  public isPromoValid(promoCode: string, order: Order, products: Product[]): boolean {
    if (this.availablePromotions.indexOf(promoCode) === -1) {
      return false;
    }

    const promoType = this.getPromoType(promoCode);
    const promotionRules = this.getPromoRules(promoCode);
    const minimumAmount = promotionRules.minimum;

    switch (promoType) {
      case 'total':
        return this.orderService.getOrderTotal(products) >= minimumAmount;
      case 'product':
        const targetProductId = promotionRules.target;
        const targetProduct = order.products.find(orderLine => orderLine.id === targetProductId);
        return (targetProduct && targetProduct.qty >= minimumAmount) || false;
    }
  }

  public getUpdatedOrderTotal(promoCode: string, products: Product[]): number {
    const promoType = this.getPromoType(promoCode);

    switch (promoType) {
      case 'total':
        const discountAmount = this.getPromoRules(promoCode).discountAmount;
        return this.orderService.getOrderTotal(products) * (100 - discountAmount) / 100;

      case 'product':
        const updatedProducts = this.cloneArray(products) as Product[];

        updatedProducts.map(product => {
          if (product.id === this.getPromoRules(promoCode).applyTo) {
            product.price = this.getPromoRules(promoCode).newPrice;
          }
        });
        return this.orderService.getOrderTotal(updatedProducts);
    }
  }


  // helper functions

  private cloneArray(array: object[]): object[] {
    const clonedArray = [];

    array.forEach(object => {
      clonedArray.push(Object.assign({}, object));
    });

    return clonedArray;
  }

  private getPromoRules(promoCode: string): OrderTotalDiscountRules | ProductDiscountRules {
    return this.getPromo(promoCode).rules;
  }

  private getPromoType(promoCode: string): PromoType {
    return this.getPromo(promoCode).type;
  }

  private getPromo(promoCode: string): Promotion {
    return this.promotionResponse.promotions.find(promotion => {
      return promotion.code === promoCode;
    });
  }
}
