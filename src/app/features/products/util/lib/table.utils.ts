import {TableColumn, TableRow} from '@adrian_alonso/component-library/interfaces';
import {ProductTableInterface} from '../../domain/lib/product.interface';

export type OnProductNameClick = (rowData : TableRow<ProductTableInterface>) => void;
export type OnProductSelected = (rowData : TableRow<ProductTableInterface>) => void;
export const tableHeadings = (
  onProductNameClick: OnProductNameClick,
  onProductSelected: OnProductSelected,
  translate: (key: string) => string
):TableColumn<ProductTableInterface>[] => ([
  {
    label: translate('products.table.name'),
    key: 'name',
    isMainCol: true,
    onCellClicked: onProductNameClick,
  },
  {
    label: translate('products.table.price'),
    key: 'price',
  },
  {
    label: translate('products.table.expirationDate'),
    key: 'expirationDate',
  },
  {
    label: translate('products.table.category'),
    key: 'category',

  },
  {
    label: translate('products.table.action'),
    key: 'action',
    onCellClicked: onProductSelected,
  }
]);


