import { Injectable, signal, effect } from '@angular/core';
import { Product } from './products-service';

@Injectable({
  providedIn: 'root',
})
export class ShoppinCartService {
  ShoppingCart = signal<Product[]>(this.loadCart());

  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.ShoppingCart()));
    });
  }

  private loadCart(): Product[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  addProduct(productToAdd: Product) {
    this.ShoppingCart.update((list) => [...list, productToAdd]);
  }

  deleteProduct(productToDelete: Product) {
    this.ShoppingCart.update((list) => {
      const index = list.findIndex((p) => p.id === productToDelete.id);
      return list.filter((_, i) => i !== index);
    });
  }

  clearCart() {
    this.ShoppingCart.set([]);
  }
}
