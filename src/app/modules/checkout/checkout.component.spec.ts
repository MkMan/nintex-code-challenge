import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { ProductsService } from './services/products/products.service';
import { ProductsServiceMock } from './services/products/products.service.mock';
import { Product } from './services/products/products.model';
import { of } from 'rxjs';

describe('CheckoutComponent', () => {
  let component; // stripped of type to test private members
  let mockProductsService: ProductsServiceMock;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      providers: [
        { provide: ProductsService, useClass: ProductsServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    mockProductsService = TestBed.get(ProductsService);
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
