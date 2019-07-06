import { Observable, of } from 'rxjs';
import { Product } from './products.model';

export class ProductsServiceMock {
  getProducts(): Observable<Product[]> {
    return of([]);
  }
}
