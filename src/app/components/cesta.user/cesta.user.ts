import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CestaService } from '../../services/cesta-service';


@Component({
  selector: 'app-cesta.user',
  imports: [],
  templateUrl: './cesta.user.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CestaUser {

  cestaService = inject(CestaService);

}