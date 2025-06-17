import {TableColumn} from '@adrian_alonso/component-library/interfaces';
import {ProductTableInterface} from '../../domain/lib/product-table.interface';
import {TableColAlignmentEnum} from '@adrian_alonso/component-library/enums';
export const tableHeadings: TableColumn<ProductTableInterface>[] = [
  {
    label: 'Name',
    key: 'name',
    isMainCol: true,
  },
  {
    label: 'Price',
    key: 'price',
  },
  {
    label: 'Expiration Date',
    key: 'expirationDate',
  },
  {
    label: 'Category',
    key: 'category',
  }
];


