import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ShoppinCartService } from '../../services/shopping-cart-service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './shopping-cart.html',
  styleUrls: ['./shopping-cart.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class ShoppingCart {

cestaService = inject(ShoppinCartService);

  precioTotal = computed(() =>
    this.cestaService.cesta().reduce((total, p) => total + p.price, 0)
  );

  deleteProduct(producto: any) {
    this.cestaService.deleteProduct(producto);
  }

}