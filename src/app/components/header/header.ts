import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShoppinCartService } from '../../services/shopping-cart-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private cartService = inject(ShoppinCartService);

  productsQuantity = computed(() => this.cartService.ShoppingCart().length);
}
