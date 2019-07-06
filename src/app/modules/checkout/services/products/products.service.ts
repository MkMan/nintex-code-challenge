import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './products.model';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) {}

  /**
   * getProducts
   * Retrieves the list of products on sale from the backend
   *
   * @returns Observable
   */
  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('//localhost:3000/products', { withCredentials: true });
  }
}
