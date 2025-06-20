import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA, effect,
  inject,
  signal,
  Signal, WritableSignal
} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {ProductListStore} from './store/products.store';
import {AppStore} from '@tfm-angular/shared/data-access';
import {ProductInterface} from './domain/lib/product.interface';
import {ProductTableComponent} from './features/product-table/product-table.component';
import {TablePageChangeEvent} from '../../shared/domain/lib/interfaces/table.interface';
import {TableService} from './util/lib/table-util.service';
import {UtilDialogService} from '../../shared/util/lib/services/dialog/dialog.service';
import {ProductDetailComponent} from './features/product-detail/product-detail.component';

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
export class ProductsComponent {

  public readonly productState= inject(ProductListStore) ;
  public readonly state= inject(AppStore);
  public readonly tableService: TableService= inject(TableService);
  public readonly dialogService: UtilDialogService= inject(UtilDialogService);

  public readonly products: Signal<Partial<ProductInterface>[] | null> = computed(() =>
    this.tableService.getTotalRows(this.fetchedProducts(), this.totalItems() ?? 0, this.pageSize()));

  public readonly fetchedProducts: WritableSignal<Map<number, Partial<ProductInterface>[]>> = signal(new Map())
  public readonly totalItems: Signal<number> = computed(() => this.productState.totalItems());
  public readonly itemsPerPage: Signal<number> = computed(() => this.productState.limit());
  private readonly lastLoadedPage: WritableSignal<number> = signal(1);

  private readonly defaultPageSize: number = 10;
  private readonly startingPage: TablePageChangeEvent = {firstInPage: 1, lastInPage: this.defaultPageSize, page :1}
  private pageInView: number= this.startingPage.page;
  public readonly currentPage: WritableSignal<TablePageChangeEvent> = signal(this.startingPage);
  public readonly pageSize: WritableSignal<number> = signal(this.defaultPageSize);

  public readonly isLoading: Signal<boolean> = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.updateLastLoadedPage(this.currentPage().page, this.fetchedProducts())
    });
    effect(() => {
      this.updateFetchedResult(this.pageInView, this.productState.products() ?? [])
    });
    effect(() => {
      this.pageInView = this.currentPage().page
    });
  }

  public onPageChange(event: TablePageChangeEvent) {
    const { firstInPage } = event;
    this.productState.setOffset(firstInPage);
    this.currentPage.set(event);
  }
  public onPageSizeChange(event: number) {
    this.productState.setLimit(event);
  }

  public onProductSelected(event: string) {
    const product : ProductInterface | null = this.productState.getProductByBarcode(event);
    if (product){
      this.state.addProductToCart(product);
    }
  }
  public onProductNameClick(event: string) {
    const product : ProductInterface | null = this.productState.getProductByBarcode(event);
    if (product) {
      this.dialogService.open(ProductDetailComponent, {
        title: 'products.detail.title',
        data: {
          product: product,
        }
      }).subscribe((amount: number) => {
        this.state.addProductToCart(product, amount);
      });
    }
  }

  private updateLastLoadedPage(currentPage:number, fetchedProducts: Map<number, Partial<ProductInterface>[]>):void{
    const isPageAlreadyFetched : boolean = fetchedProducts.has(this.currentPage().page);
    if (isPageAlreadyFetched){
      this.lastLoadedPage.set(currentPage)
    }
  }

  private updateFetchedResult(page:number, rows: Partial<ProductInterface>[]):void{
    if (!rows.length){
      return
    }
    this.fetchedProducts.update((results:Map<number, Partial<ProductInterface>[]>) => {
      const updated= new Map(results);
      updated.set(page,rows)
      return updated
    });
  }
}
