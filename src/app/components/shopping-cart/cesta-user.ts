import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CestaService } from '../../services/shopping-cart-service';


@Component({
  selector: 'app-shopping-cart',
  imports: [],
  templateUrl: './shopping-cart.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCart {

  cestaService = inject(CestaService);

}