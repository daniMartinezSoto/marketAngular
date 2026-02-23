import { Routes } from '@angular/router';

import { ProductDetail } from './components/product-detail/product-detail';
import { AllProducts } from './components/all-products/all-products';
import { ShoppingCart } from './components/shopping-cart/shopping-cart';




export const routes: Routes = [
  { path: '', component: AllProducts},
  { path: 'cesta', component: ShoppingCart },
  { path: 'producto/:id', component: ProductDetail },
  { path: '**', redirectTo: '' },

];