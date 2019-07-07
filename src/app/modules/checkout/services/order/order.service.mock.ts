import { Order } from './order.model';

export class OrderServiceMock {
  updateOrder(id: string, qty: number): Order {
    return {
      promotion: '',
      products: []
    };
  }
}
