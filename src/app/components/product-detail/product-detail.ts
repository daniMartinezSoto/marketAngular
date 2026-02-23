import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product, ProductoService } from '../../services/products-service';
import { CestaService } from '../../services/shopping-cart-service';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {



  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  private cestaService = inject(CestaService);

  producto = signal<Product | null>(null);



 constructor() {
    effect(() => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.productoService.getProductos().subscribe(data => {
        this.producto.set(data.find(p => p.id === id) ?? null);
      });
    });
  }


  agregarACesta() {
    const p = this.producto();
    if (p) this.cestaService.agregarProducto(p);
  }



 }
