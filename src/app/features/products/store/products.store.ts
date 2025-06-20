import {ProductInterface} from '../domain/lib/product.interface';
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {ProductService} from '../data-access/lib/product.service';
import {computed, inject} from '@angular/core';
import {switchMap, tap} from 'rxjs';
import {rxMethod} from '@ngrx/signals/rxjs-interop';


export type ProductListState = {
  products: ProductInterface[] | null;
  offset: number,
  limit: number,
  totalItems: number,
}
const initialState : ProductListState = {
  products: null,
  offset: 0,
  limit: 10,
  totalItems: 0,
}

type LoadProductsParams = {
  offset: ProductListState['offset'],
  limit: ProductListState['limit'],
}

export const ProductListStore = signalStore(
  withState(initialState),
  withComputed((store) =>({
    _loadProductsPayload: computed( () => ({
      offset: store.offset(),
      limit: store.limit(),
    })),
  })),
  withMethods((
    store: any,
    productService: ProductService = inject(ProductService)
  ) => ({
    setLimit(limit: number): void {
      patchState(store, () => ({ limit }));
    },
    setOffset(offset: number): void {
      patchState(store, () => ({ offset }));
    },
    getProductByBarcode(barcode: string): ProductInterface | null {
      const products = store.products() ?? [];
      return products.find((p: ProductInterface) => p.barcode === barcode);
    },
    searchProducts: rxMethod<LoadProductsParams>((source$) =>
      source$.pipe(
        switchMap(({ offset, limit }) =>
          productService.getAllProducts(offset, limit).pipe(
            tap((response: any) => {
              patchState(store, () => ({
                products: response.body.list,
                totalItems: response.body.pagination.totalItems ?? 0,
              }));
            })
          )
        )
      )
    )
  })),
withHooks({
  onInit: (store) => {
    store.searchProducts(store._loadProductsPayload);
  }
})

);
