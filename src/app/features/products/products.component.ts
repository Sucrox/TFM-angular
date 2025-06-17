import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
  Signal
} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {ProductListStore} from './store/products.store';
import {AppStore} from '@tfm-angular/shared/data-access';
import {ProductInterface} from './domain/lib/product.interface';
import {Observable} from 'rxjs';
import {ProductTableComponent} from './features/product-table/product-table.component';


@Component({
  selector: 'app-products',
  imports: [
    TranslatePipe,
    ProductTableComponent,
  ],
  templateUrl: './products.component.html',
  standalone: true,
  styleUrl: './products.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [ProductListStore]
})
export class ProductsComponent implements OnInit{

  public readonly productState= inject(ProductListStore) ;
  public readonly state= inject(AppStore);

  public readonly products: Signal<ProductInterface[] | null> = computed(() => this.productState.products());

  public readonly isLoading: Signal<boolean> = signal<boolean>(false);

  public ngOnInit() {
    this.loadProducts().subscribe();
  }

  private loadProducts(): Observable<any>{
    return this.productState.searchTransactions();
  }

}
