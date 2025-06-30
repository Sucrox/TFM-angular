import {TableColumn, TableRow} from '@adrian_alonso/component-library/interfaces';
import {TableColAlignmentEnum} from '@adrian_alonso/component-library/enums';

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
    label: translate('shoppingCart.table.name'),
    key: 'name',
    isMainCol: true,
  },
  {
    label: translate('shoppingCart.table.price'),
    key: 'price',
  },
  {
    label: '',
    key: 'decrement',
    onCellClicked: onProductDecrement,
  },
  {
    label: translate('shoppingCart.table.quantity'),
    key: 'quantity',
    alignment: TableColAlignmentEnum.CENTER,
  },
  {
    label: '',
    key: 'increment',
    onCellClicked: onProductIncrement,
  },
  {
    label: '',
    key: 'delete',
    onCellClicked: onProductDeleted,
  },
]);

