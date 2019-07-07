import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PromotionResponse } from './promotion.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }

  private promotionResponse: PromotionResponse;

  public getPromotionCode(): void {
    this.http.get<PromotionResponse>('//localhost:3000/promotions', { withCredentials: true }).subscribe(response => {
      this.promotionResponse = response;
    });
  }
}
