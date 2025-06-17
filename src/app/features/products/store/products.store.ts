import {ProductInterface} from '../domain/lib/product.interface';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {ProductService} from '../data-access/lib/product.service';
import {inject} from '@angular/core';
import {Observable, tap} from 'rxjs';

export type ProductListState = {
  products: ProductInterface[] | null;
  offset: number,
  limit: number
}
const initialState : ProductListState = {
  products: null,
  offset: 0,
  limit: 10,
}

export const ProductListStore = signalStore(
  withState(initialState),
  withMethods((
    store: any,
    productService: ProductService = inject(ProductService)
  ) => ({
    setLimit(limit: number): void {
      patchState(store, () => ({ limit }));
    },
    searchTransactions(): Observable<any> {
      return productService.getAllProducts(store.offset(), store.limit()).pipe(
        tap({
          next: (response: any) => {
            patchState(store, () => ({
              products: response.body.list,
              offset: store.offset() + response.body.length,
            }));
          },
        })
      );
    },
  }))
);
