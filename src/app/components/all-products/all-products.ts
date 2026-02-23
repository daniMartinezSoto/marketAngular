import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product, ProductoService } from '../../services/products-service';
import { CurrencyPipe } from '@angular/common';
import { ShoppinCartService } from '../../services/shopping-cart-service';

@Component({
  selector: 'app-all-products',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss',
})
export class AllProducts {



  mostrarToast = signal(false);

  private productoService = inject(ProductoService);
  private cestaService = inject(ShoppinCartService);


  cesta = signal<Product[]>([]);
  productos = signal<Product[]>([]);

  constructor() {
    effect(() => {
      this.productoService.getProductos().subscribe(data => {
        this.productos.set(data);


      });
    });
    console.log('Cesta actualizada:', this.cesta());
  }

  agregarACesta(producto: Product) {
    console.log('producto añadido', producto);
    this.cestaService.agregarProducto(producto);
    this.mostrarToast.set(true);
    setTimeout(() => this.mostrarToast.set(false), 2000);
  }




}
