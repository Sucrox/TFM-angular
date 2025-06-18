import {TableColumn} from '@adrian_alonso/component-library/interfaces';
import {ProductTableInterface} from '../../domain/lib/product.interface';
export const tableHeadings: TableColumn<ProductTableInterface>[] = [
  {
    label: 'products.table.name',
    key: 'name',
    isMainCol: true,
  },
  {
    label: 'products.table.price',
    key: 'price',
  },
  {
    label: 'products.table.expirationDate',
    key: 'expirationDate',
  },
  {
    label: 'products.table.category',
    key: 'category',
  }
];


