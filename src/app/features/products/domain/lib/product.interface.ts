import {CellRenderer} from '@adrian_alonso/component-library/interfaces';

export interface ProductInterface {
  name: string;
  price: number;
  quantity: number;
  description: string;
  barcode: string;
  expirationDate: string;
  category: string;
}

export interface ProductTableInterface {
  name: string;
  price: string;
  expirationDate: string;
  category: CategoryEnum;
  action?: string | CellRenderer<ProductTableInterface>;

}

export enum CategoryEnum {
  FRUITS = 'FRUITS',
  VEGETABLES = 'VEGETABLES',
  DAIRY = 'DAIRY',
  BEVERAGES = 'BEVERAGES',
  BAKERY = 'BAKERY',
}
