import { Injectable, signal, effect } from '@angular/core';
import { Producto } from './producto-service';

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  cesta = signal<Producto[]>(this.cargarCesta());

  constructor() {
    effect(() => {
      localStorage.setItem('cesta', JSON.stringify(this.cesta()));
    });
  }

  private cargarCesta(): Producto[] {
    const cesta = localStorage.getItem('cesta');
    return cesta ? JSON.parse(cesta) : [];
  }

  agregarProducto(producto: Producto) {
    this.cesta.update(lista => [...lista, producto]);
  }

}