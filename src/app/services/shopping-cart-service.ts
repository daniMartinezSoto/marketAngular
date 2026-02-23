import { Injectable, signal, effect } from '@angular/core';
import { Product } from './products-service';

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  cesta = signal<Product[]>(this.cargarCesta());

  constructor() {
    effect(() => {
      localStorage.setItem('cesta', JSON.stringify(this.cesta()));
    });
  }

  private cargarCesta(): Product[] {
      return JSON.parse(localStorage.getItem('cesta') || '[]');
  }

  agregarProducto(producto: Product) {
    this.cesta.update(lista => [...lista, producto]);
  }

}