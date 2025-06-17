
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
  price: number;
  expirationDate: string;
  category: CategoryEnum;
}

export enum CategoryEnum {
  FRUITS = 'FRUITS',
  VEGETABLES = 'VEGETABLES',
  DAIRY = 'DAIRY',
  BEVERAGES = 'BEVERAGES',
  BAKERY = 'BAKERY',
}
