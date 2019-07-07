import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CheckoutComponent } from './checkout.component';
import { ProductsService } from './services/products/products.service';
import { ProductsServiceMock } from './services/products/products.service.mock';
import { OrderService } from './services/order/order.service';
import { OrderServiceMock } from './services/order/order.service.mock';

import { Product } from './services/products/products.model';
import { Order } from './services/order/order.model';

describe('CheckoutComponent', () => {
  let component; // stripped of type to test private members
  let mockProductsService: ProductsServiceMock;
  let mockOrderService: OrderServiceMock;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      providers: [
        { provide: ProductsService, useClass: ProductsServiceMock },
        { provide: OrderService, useClass: OrderServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;

    mockProductsService = TestBed.get(ProductsService);
    mockOrderService = TestBed.get(OrderService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    beforeEach(() => {
      spyOn(component, 'initialiseProducts');
      component.ngOnInit();
    });

    it('should call initialiseProducts', () => {
      expect(component.initialiseProducts).toHaveBeenCalled();
    });
  });

  describe('#onQtyChange', () => {
    const mockProductId = 'SKU11';
    const mockProductQty = '3';
    const mockReturnedOrder: Order = {
      products: [
        {
          id: 'not SKU11 because the implementation is irrelevant',
          qty: 9001 // It's over 9000!!!!!
        }
      ]
    };

    beforeEach(() => {
      spyOn(mockOrderService, 'updateOrder').and.returnValue(mockReturnedOrder);
      component.onQtyChange(mockProductId, mockProductQty);
    });

    it('should call the order service to update the order', () => {
      expect(mockOrderService.updateOrder).toHaveBeenCalledWith(mockProductId, parseInt(mockProductQty, 10));
    });

    it('should set the returned order to the class member to populate the view', () => {
      expect(component.order).toEqual(mockReturnedOrder);
    });
  });

  describe('#getSubtotalForId', () => {
    beforeEach(() => {
      component.products = [
        {
          id: 'C1',
          price: 10
        },
        {
          id: 'C3',
          price: 10
        }
      ];
      component.order = {
        products: [
          {
            id: 'C1',
            qty: 5
          }
        ]
      };
    });

    it('should return the subtotal for the id provided if the product is in the order', () => {
      expect(component.getSubtotalForId('C1')).toEqual(50);
    });

    it('should return 0 if the product is not in the order', () => {
      expect(component.getSubtotalForId('C3')).toEqual(0);
    });
  });

  describe('#initialiseProducts', () => {
    const mockProducts: Product[] = [
      {
        id: 'hello',
        name: 'Hello world app',
        price: 9000
      }
    ];

    beforeEach(() => {
      spyOn(mockProductsService, 'getProducts').and.returnValue(of(mockProducts));
      component.initialiseProducts();
    });

    it('should call the service to get the products', () => {
      expect(mockProductsService.getProducts).toHaveBeenCalled();
    });

    it('should set the returned products to the class member to populate the view', () => {
      expect(component.products).toEqual(mockProducts);
    });
  });
});
