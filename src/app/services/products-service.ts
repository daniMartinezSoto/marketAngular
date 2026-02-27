import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = '/productos.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
}
