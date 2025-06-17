import {Injectable} from '@angular/core';
import {CategoryEnum, ProductInterface, ProductTableInterface} from '../../domain/lib/product.interface';
import {TableRow} from '@adrian_alonso/component-library/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  /**
   * Maps table's row data to the table's row data with the correct renderers
   * @param rows
   * @returns
   */
  public mapTableData(rows: Partial<ProductInterface>[]): TableRow<ProductTableInterface>[] {
    if (!rows) {
      return [];
    }

    return rows.map((row: Partial<ProductInterface>) => ({
      id: row.barcode!,
      data: {
        name: row.name ?? '',
        price: row.price?.toString() ?? '0',
        expirationDate: row.expirationDate ?? '',
        category: row.category ?? 'UNKNOWN' as CategoryEnum,
      }
    }));
  }

}
