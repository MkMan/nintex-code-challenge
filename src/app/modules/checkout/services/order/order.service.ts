import { Injectable } from '@angular/core';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  private order: Order = {
    products: []
  };

  public updateOrder(id: string, qty: number): Order {
    let productIndex: number;

    this.order.products.forEach((product, index) => {
      if (product.id === id) {
        productIndex = index;
        return;
      }
    });

    if (productIndex >= 0) {
      // the product already has an entry in the order
      if (qty === 0) {
        // remove it because the new qty is 0
        this.order.products.splice(productIndex, 1);
      } else {
        // amend the qty
        this.order.products[productIndex].qty = qty;
      }

    } else {
      // the product is new to the order, add it
      this.order.products.push({ id, qty });
    }

    return this.order;
  }
}
