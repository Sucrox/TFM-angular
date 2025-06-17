import {CategoryEnum} from './product.interface';

export interface ProductTableInterface{
  name: string;
  price: number;
  expirationDate: string;
  category: CategoryEnum;
}
