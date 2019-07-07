import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { PromotionService } from './promotion.service';
import { PromotionResponse } from './promotion.model';

describe('PromotionService', () => {
  let service;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PromotionService ],
    });

    service = TestBed.get(PromotionService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getPromotionCodes', () => {
    let request: TestRequest;
    const mockResponse: PromotionResponse = {
      allowMultiple: false,
      promotions: [
        {
          type: 'product',
          code: 'XYZ',
          rules: {
            target: 'X1',
            applyTo: 'X1',
            minimum: 3,
            newPrice: 12
          }
        },
        {
          type: 'product',
          code: 'ABC',
          rules: {
            minimum: 3,
            discountAmount: 10
          }
        },
      ]
    };

    beforeEach(() => {
      service.getPromotionCodes();
      request = httpMock.expectOne('//localhost:3000/promotions');
      request.flush(mockResponse);
    });

    afterEach(() => {
      // No outstanding calls
      httpMock.verify();
    });

    it('should call the right endpoint', () => {
      expect(request.request.url).toEqual('//localhost:3000/promotions');
    });

    it('should make a GET call', () => {
      expect(request.request.method).toEqual('GET');
    });

    it('should have withCredentials set to true', () => {
      expect(request.request.withCredentials).toEqual(true);
    });

    it('should set the class member to the response', () => {
      expect(service.promotionResponse).toEqual(mockResponse);
    });

    it('should create an array of the promotion codes', () => {
      expect(service.availablePromotions).toEqual(['XYZ', 'ABC']);
    });
  });
});
