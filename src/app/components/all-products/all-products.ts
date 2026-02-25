import { Component, computed, effect, inject, signal } from '@angular/core';
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



  showNotification = signal(false);
  filtro = signal<string | null>(null);

  private productoService = inject(ProductoService);
  private shoppingCartService = inject(ShoppinCartService);


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

  addToCart(producto: Product) {
    console.log('producto añadido', producto);
    this.shoppingCartService.addProduct(producto);
    this.showNotification.set(true);
    setTimeout(() => this.showNotification.set(false), 2000);
  }



productosFiltrados = computed(() => {
  const f = this.filtro();
  if (!f) return this.productos();
  return this.productos().filter(p => p.type === f);
});

seleccionarFiltro(tipo: string) {
  this.filtro.set(this.filtro() === tipo ? null : tipo);
}

}
