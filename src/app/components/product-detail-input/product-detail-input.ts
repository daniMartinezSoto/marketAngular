import { CurrencyPipe } from '@angular/common';
import { Component, signal, inject, input } from '@angular/core';
import { Product } from '../../services/products-service';
import { ShoppinCartService } from '../../services/shopping-cart-service';

@Component({
  selector: 'app-product-detail-input',
  imports: [CurrencyPipe],
  templateUrl: './product-detail-input.html',
  styleUrl: './product-detail-input.scss',
})
export class ProductDetailInput {
  producto = input.required<Product>();

  private shoppingCartService = inject(ShoppinCartService);
  showNotification = signal(false);

  addToCart() {
    this.shoppingCartService.addProduct(this.producto());
    this.showNotification.set(true);
    setTimeout(() => this.showNotification.set(false), 2000);
  }
}
