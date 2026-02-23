import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductoService {


 private url = '/productos.json'; 


  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  
}
