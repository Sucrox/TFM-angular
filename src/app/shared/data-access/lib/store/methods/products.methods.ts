import {AppState} from '@tfm-angular/shared/data-access';
import {patchState} from '@ngrx/signals';
import {ProductInterface} from '../../../../../features/products/domain/lib/product.interface';

export default (
  store: any) => ({
  updateProducts(products: ProductInterface[] | null): void {
    patchState(store, (state: AppState) => {
      if (!products) {
        return { productsInCart: null };
      }

      const updatedMap = new Map<string, { product: ProductInterface; quantity: number }>();
      for (const product of products) {
        const existing = updatedMap.get(product.barcode);
        updatedMap.set(product.barcode, {
          product,
          quantity: existing ? existing.quantity + 1 : 1,
        });
      }

      return { productsInCart: updatedMap };
    });
  },
  addProductToCart(product: ProductInterface): void {
    patchState(store, (state: AppState) => {
      const currentMap = new Map(state.productsInCart ?? []);
      const existing = currentMap.get(product.barcode);

      currentMap.set(product.barcode, {
        product,
        quantity: existing ? existing.quantity + 1 : 1,
      });

      return { productsInCart: currentMap };
    });
  }
})
