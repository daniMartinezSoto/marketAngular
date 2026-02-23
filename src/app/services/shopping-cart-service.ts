import { Injectable, signal, effect } from '@angular/core';
import { Product } from './products-service';

@Injectable({
  providedIn: 'root'
})
export class ShoppinCartService {

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

eliminarProducto(producto: Product) {
  this.cesta.update(lista => {
    const index = lista.findIndex(p => p.id === producto.id);
    return lista.filter((_, i) => i !== index);
  });
}
}