import {DomainAction} from './actions';
import {Injector} from '@angular/core';

export interface DialogInterface {
  title?: string;
  ariaLabel?: string;
  canClose?: boolean;
  actions?: DomainAction [];
  closeAlt?: string;
  injector?: Injector;
  data?: Record<string, any>;
}

export const defaultOptionDialog: DialogInterface = {
  title: '',
  canClose: true,
  actions: [],
  closeAlt: ''
}
