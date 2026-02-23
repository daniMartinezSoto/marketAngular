import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Producto, ProductoService } from '../../services/producto-service';
import { CestaService } from '../../services/cesta-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-grid-products',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './grid-products.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridProducts {

  mostrarToast = signal(false);

  private productoService = inject(ProductoService);
  private cestaService = inject(CestaService);


  cesta = signal<Producto[]>([]);
  productos = signal<Producto[]>([]);

  constructor() {
    effect(() => {
      this.productoService.getProductos().subscribe(data => {
        this.productos.set(data);


      });
    });
    console.log('Cesta actualizada:', this.cesta());
  }

  agregarACesta(producto: Producto) {
    console.log('producto añadido', producto);
    this.cestaService.agregarProducto(producto);
    this.mostrarToast.set(true);
    setTimeout(() => this.mostrarToast.set(false), 2000);
  }
}
