import { Order } from './order.model';
import { Product } from '../products/products.model';

export class OrderServiceMock {
  updateOrder(id: string, qty: number): Order {
    return {
      promotion: '',
      products: []
    };
  }

  getOrderTotal(products: Product[]): number {
    return 9000;
  }
}
