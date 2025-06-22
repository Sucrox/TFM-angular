import {TableColumn, TableRow} from '@adrian_alonso/component-library/interfaces';

export type OnProductIncrement = (rowData : TableRow<any>) => void;
export type OnProductDecrement = (rowData : TableRow<any>) => void;
export type OnProductDeleted = (rowData : TableRow<any>) => void;

export const tableHeadings = (
  onProductDecrement: OnProductDecrement,
  onProductIncrement: OnProductIncrement,
  onProductDeleted: OnProductDeleted,
  translate: (key: string) => string
):TableColumn<any>[] => ([
  {
    label: translate('products.table.name'),
    key: 'name',
    isMainCol: true,
  },
  {
    label: translate('products.table.price'),
    key: 'price',
  },
  {
    label: translate('products.table.decrement'),
    key: 'decrement',
    onCellClicked: onProductDecrement,
  },
  {
    label: translate('products.table.quantity'),
    key: 'quantity',
  },
  {
    label: translate('products.table.increment'),
    key: 'increment',
    onCellClicked: onProductIncrement,
  },
  {
    label: translate('products.table.action'),
    key: 'delete',
    onCellClicked: onProductDeleted,
  },
]);

