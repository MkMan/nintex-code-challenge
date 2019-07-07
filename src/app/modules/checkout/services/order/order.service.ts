import { Injectable } from '@angular/core';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  private order: Order;

  public updateOrder(id: string, qty: number): Order {
    return this.order;
  }
}
