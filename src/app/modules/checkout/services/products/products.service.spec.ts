import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ProductsService ]
    });

    service = TestBed.get(ProductsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getProducts', () => {
    let request: TestRequest;

    beforeEach(() => {
      service.getProducts().subscribe();
      request = httpMock.expectOne('//localhost:3000/products');
    });

    afterEach(() => {
      // No outstanding calls
      httpMock.verify();
    });

    it('should call the right endpoint', () => {
      expect(request.request.url).toEqual('//localhost:3000/products');
    });

    it('should make a GET call', () => {
      expect(request.request.method).toEqual('GET');
    });

    it('should have withCredentials set to true', () => {
      expect(request.request.withCredentials).toEqual(true);
    });
  });
});
