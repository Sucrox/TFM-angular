import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals"
import userMethods from './methods/user.methods';
import {ProductInterface} from '../../../../features/products/domain/lib/product.interface';
import productsMethods from './methods/products.methods';

export type UserState = {
  phone?: string;
  firstName?: string;
  familyName?: string;
  email?: string;
  dni?: string;
  password?: string;
}

export type AppState = {
  user: UserState | null;
  productsInCart: Map<string, { product: ProductInterface; quantity: number }> | null;
};

export const initialState: Readonly<AppState> = {
  user: null,
  productsInCart: null
};

export const AppStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
  })),
  withMethods(userMethods),
  withMethods(productsMethods),
  withMethods((store: any) => ({
    ...userMethods(store),
    resetState: () => patchState(store, () => ({
      user: null,
    }))
  })),
);

