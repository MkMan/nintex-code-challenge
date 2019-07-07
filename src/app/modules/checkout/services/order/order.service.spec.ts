import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { Order } from './order.model';

describe('OrderService', () => {
  let service; // stripped of its type to access/manipulate the private variable

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#updateOrder', () => {
    it('should update the quantity of a product already existing in the order', () => {
      // arrange
      const mockCurrentOrder: Order = {
        products: [
          {
            id: 'X1',
            qty: 3
          }
        ]
      };
      service.order = mockCurrentOrder;

      // act
      service.updateOrder(mockCurrentOrder.products[0].id, 4);

      // assert
      expect(service.order.products[0].qty).toEqual(4);
    });

    it('should remove a product from the order if its new qty is 0', () => {
      // arrange
      const mockCurrentOrder: Order = {
        products: [
          {
            id: 'X1',
            qty: 3
          }
        ]
      };
      service.order = mockCurrentOrder;

      // act
      service.updateOrder(mockCurrentOrder.products[0].id, 0);

      // assert
      expect(service.order.products).not.toContain(
        {
          id: 'X1',
          qty: jasmine.any(Number)
        }
      );
    });

    it('should add a product to the order if the qty is not 0', () => {
      // arrange
      const mockCurrentOrder: Order = {
        products: []
      };
      service.order = mockCurrentOrder;

      // act
      service.updateOrder('X2', 5);

      // assert
      expect(service.order.products).toContain(
        {
          id: 'X2',
          qty: 5
        }
      );
    });

    it('should return the updated order', () => {
      // arrange
      const mockCurrentOrder: Order = {
        products: [
          {
            id: 'X1',
            qty: 3
          }
        ]
      };
      const expectedReturn: Order = {
        products: [
          {
            id: 'X1',
            qty: 3
          },
          {
            id: 'X3',
            qty: 7
          }
        ]
      };
      service.order = mockCurrentOrder;

      // act
      const actualReturn: Order = service.updateOrder('X3', 7);

      // assert
      expect(actualReturn).toEqual(expectedReturn);
    });
  });
});
