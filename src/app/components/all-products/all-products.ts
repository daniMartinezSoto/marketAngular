import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product, ProductService } from '../../services/products-service';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ShoppinCartService } from '../../services/shopping-cart-service';
import { ProductDetailInput } from '../product-detail-input/product-detail-input';

@Component({
  selector: 'app-all-products',
  imports: [RouterLink, CurrencyPipe, TitleCasePipe, ProductDetailInput],
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss',
})
export class AllProducts {
  productTypes = computed(() => {
    const listTypes = this.products().map((p) => p.type);
    return [...new Set(listTypes)];
  });

  showNotification = signal(false);
  filter = signal<string | null>(null);

  private productoService = inject(ProductService);
  private shoppingCartService = inject(ShoppinCartService);

  cart = signal<Product[]>([]);
  products = signal<Product[]>([]);
  productoSeleccionado = signal<Product | null>(null);

  constructor() {
    effect(() => {
      this.productoService.getProducts().subscribe((data) => {
        this.products.set(data);
      });
    });
  }

  addToCart(producto: Product) {
    this.shoppingCartService.addProduct(producto);
    this.showNotification.set(true);
    setTimeout(() => this.showNotification.set(false), 2000);
  }

  filtProducts = computed(() => {
    const f = this.filter();
    if (!f) return this.products();
    return this.products().filter((p) => p.type === f);
  });

  selectFilter(tipo: string | null) {
    this.filter.set(this.filter() === tipo ? null : tipo);
  }

  seleccionarProducto(producto: Product) {
    this.productoSeleccionado.set(producto);
  }

  cerrarModal() {
    this.productoSeleccionado.set(null);
  }
}
