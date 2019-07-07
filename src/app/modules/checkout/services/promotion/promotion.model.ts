export interface PromotionResponse {
  allowMultiple: boolean;
  promotions: Promotion[];
}

export interface Promotion {
  type: PromoType;
  code: string;
  rules: OrderTotalDiscountRules | ProductDiscountRules;
}

export interface OrderTotalDiscountRules {
  target?: undefined;
  applyTo?: undefined;
  minimum: number; // order total
  discountAmount: number; // discount percentage
  newPrice?: undefined;
}

export interface ProductDiscountRules {
  target: string; // id of product to test req against
  applyTo: string; // id of product to apply the discount to
  minimum: number; // qty of product
  discountAmount?: undefined;
  newPrice: number;
}

export type PromoType = 'total' | 'product';
