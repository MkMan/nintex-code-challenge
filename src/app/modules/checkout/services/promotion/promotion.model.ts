export interface PromotionResponse {
  allowMultiple: boolean;
  promotions: Promotion[];
}

export interface Promotion {
  type: 'total' | 'product';
  code: string;
  rules: OrderTotalDiscountRules | ProductDiscountRules;
}

export interface OrderTotalDiscountRules {
  minimum: number; // order total
  discountAmount: number; // discount percentage
}

export interface ProductDiscountRules {
  target: string; // id of product to test req against
  applyTo: string; // id of product to apply the discount to
  minimum: number; // qty of product
  newPrice: number;
}
