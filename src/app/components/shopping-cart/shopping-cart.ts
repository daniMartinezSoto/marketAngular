import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ShoppinCartService } from '../../services/shopping-cart-service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  imports: [CurrencyPipe, RouterLink, ReactiveFormsModule],
  templateUrl: './shopping-cart.html',
  styleUrls: ['./shopping-cart.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCart {
  shoppingCartService = inject(ShoppinCartService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    console.log('COMPRA REALIZADA - Email:', this.form.value.email);
    this.shoppingCartService.clearCart();
  }

  precioTotal = computed(() =>
    this.shoppingCartService.ShoppingCart().reduce((total, p) => total + p.price, 0),
  );

  deleteProduct(productToDelete: any) {
    this.shoppingCartService.deleteProduct(productToDelete);
  }
}
