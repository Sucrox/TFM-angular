import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  signal,
  Signal,
  WritableSignal
} from '@angular/core';
import {AppStore} from '@tfm-angular/shared/data-access';
import {TableComponent} from './features/table/table.component';
import {TablePageChangeEvent} from '../../shared/domain/lib/interfaces/table.interface';
import {ProductInterface} from '../products/domain/lib/product.interface';
import {TranslatePipe} from '@ngx-translate/core';
import {ButtonType} from '@adrian_alonso/component-library/enums';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'tfm-shopping-cart',
  imports: [
    TableComponent,
    TranslatePipe,
    CurrencyPipe
  ],
  templateUrl: './shopping-cart.component.html',
  standalone: true,
  styleUrl: './shopping-cart.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShoppingCartComponent {

  public readonly state= inject(AppStore);

  public products: Signal<Map<string, { product: ProductInterface; quantity: number }> | null> = computed(() => this.state.productsInCart());
  public readonly totalItems: Signal<number> = computed(() => this.state.productsInCart()?.size ?? 0);
  public readonly itemsPerPage: WritableSignal<number> = signal<number>(10);
  public readonly total: Signal<number> = computed(() => this.getTotalPrice(this.products()));

  protected readonly ButtonTypeEnum = ButtonType;
  private readonly defaultPageSize: number = 10;
  private readonly startingPage: TablePageChangeEvent = {firstInPage: 1, lastInPage: this.defaultPageSize, page :1}
  private pageInView: number= this.startingPage.page;
  public readonly currentPage: WritableSignal<TablePageChangeEvent> = signal(this.startingPage);
  public readonly pageSize: WritableSignal<number> = signal(this.defaultPageSize);

  public onProductDeleted(barcode:string): void{
    this.state.deleteProduct(barcode);
  }

  public onProductDecrement(barcode:string): void{
    this.state.decrementProduct(barcode);
  }

  public onProductIncrement(barcode:string): void{
    this.state.incrementProduct(barcode);
  }

  public confirmCart():void{
    alert('Funcionalidad a implementar');
  }

  private getTotalPrice(products: Map<string, { product: ProductInterface; quantity: number }> | null): number {
    if (!products) return 0;

    let total = 0;
    for (const { product, quantity } of products.values()) {
      total += Number(product.price) * quantity;
    }

    return total;
  }
}
