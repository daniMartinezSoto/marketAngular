import { Routes } from '@angular/router';
import { GridProducts } from './components/grid-products/grid-products';
import { CestaUser } from './components/cesta.user/cesta.user';
import { ProductDetail } from './components/product-detail/product-detail';

export const routes: Routes = [
  { path: '', component: GridProducts },
  { path: 'cesta', component:CestaUser },
 { path: 'producto/:id', component: ProductDetail },
   {path:'**', redirectTo:''},

];