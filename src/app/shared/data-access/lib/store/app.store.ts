import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals"
import userMethods from './methods/user.methods';

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
};

export const initialState: Readonly<AppState> = {
  user: null,
};

export const AppStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
  })),
  withMethods(userMethods),
  withMethods((store: any) => ({
    ...userMethods(store),
    resetState: () => patchState(store, () => ({
      user: null,
    }))
  })),
);

