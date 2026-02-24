import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product, ProductoService } from '../../services/products-service';
import { ShoppinCartService } from '../../services/shopping-cart-service';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-detail.html',
    styleUrl: './product-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {

showNotification = signal(false);

  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  private cestaService = inject(ShoppinCartService);

  producto = signal<Product | null>(null);



 constructor() {
    effect(() => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.productoService.getProductos().subscribe(data => {
        this.producto.set(data.find(p => p.id === id) ?? null);
      });
    });
  }


  addToCart() {
    const p = this.producto();
    if (p) this.cestaService.addProduct(p);
        this.showNotification.set(true);
    setTimeout(() => this.showNotification.set(false), 2000);
  }



 }
