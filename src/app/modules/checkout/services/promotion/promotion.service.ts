import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PromotionResponse, PromoType } from './promotion.model';
import { Order } from '../order/order.model';
import { Product } from '../products/products.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }

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
    const promotionRules = this.promotionResponse.promotions.find(promotion => {
      return promotion.code === promoCode;
    }).rules;
    const minimumAmount = promotionRules.minimum;

    switch (promoType) {
      case 'total':
        return this.getOrderTotal(order, products) >= minimumAmount;
      case 'product':
        const targetProductId = promotionRules.target;
        const targetProduct = order.products.find(orderLine => orderLine.id === targetProductId);
        return (targetProduct && targetProduct.qty >= minimumAmount) || false;
    }
  }

  public getUpdatedOrderTotal(promoCode: string, order: Order, products: Product[]): number {
    const promoType = this.getPromoType(promoCode);
    switch (promoType) {
      case 'total':
        const discountAmount = this.promotionResponse.promotions.find(promotion => promotion.code === promoCode).rules.discountAmount;
        return this.getOrderTotal(order, products) * (100 - discountAmount) / 100;
      case 'product':
        const updatedProducts = [...products];
        updatedProducts.map(product => {
          if (product.id === this.promotionResponse.promotions.find(promotion => promotion.code === promoCode).rules.applyTo) {
            product.price = this.promotionResponse.promotions.find(promotion => promotion.code === promoCode).rules.newPrice;
          }
        });
        return this.getOrderTotal(order, updatedProducts);

    }
  }

  private getPromoType(promoCode: string): PromoType {
    return this.promotionResponse.promotions.find((promotion) => {
      return promotion.code === promoCode;
    }).type;
  }

  private getOrderTotal(order: Order, products: Product[]): number {
    let total = 0;

    order.products.forEach(orderLine => {
      const productPrice = products.find(product => product.id === orderLine.id).price;
      total += (orderLine.qty * productPrice);
    });

    return total;
  }
}
