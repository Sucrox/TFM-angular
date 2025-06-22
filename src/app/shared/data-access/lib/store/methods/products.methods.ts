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
  addProductToCart(product: ProductInterface, quantity: number = 1): void {
    patchState(store, (state: AppState) => {
      const currentMap = new Map(state.productsInCart ?? []);
      const existing = currentMap.get(product.barcode);

      const existingQty = existing ? Number(existing.quantity) : 0;
      const addedQty = Number(quantity);

      currentMap.set(product.barcode, {
        product,
        quantity: existingQty + addedQty,
      });

      return { productsInCart: currentMap };
    });
  },
  deleteProduct(barcode: string): void {
    patchState(store, (state: AppState) => {
      if (!state.productsInCart) return {};

      const currentMap = new Map(state.productsInCart);
      currentMap.delete(barcode);

      return { productsInCart: currentMap };
    });
  },
  decrementProduct(barcode: string): void {
    patchState(store, (state: AppState) => {
      if (!state.productsInCart) return {};

      const currentMap = new Map(state.productsInCart);
      const entry = currentMap.get(barcode);

      if (!entry) return {};

      const newQuantity = entry.quantity - 1;
      if (newQuantity <= 0) {
        currentMap.delete(barcode);
      } else {
        currentMap.set(barcode, {
          product: entry.product,
          quantity: newQuantity,
        });
      }

      return { productsInCart: currentMap };
    });
  },
  incrementProduct(barcode: string): void {
    patchState(store, (state: AppState) => {
      if (!state.productsInCart) return {};

      const currentMap = new Map(state.productsInCart);
      const entry = currentMap.get(barcode);

      if (!entry) return {};

      currentMap.set(barcode, {
        product: entry.product,
        quantity: entry.quantity + 1,
      });

      return { productsInCart: currentMap };
    });
  },
})
