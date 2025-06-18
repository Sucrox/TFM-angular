import {inject, Injectable} from '@angular/core';
import {ProductInterface, ProductTableInterface} from '../../domain/lib/product.interface';
import {TableRow} from '@adrian_alonso/component-library/interfaces';
import {uniqueId} from 'lodash-es';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private currencyPipe = new CurrencyPipe('es');
  private translateService: TranslateService = inject(TranslateService);
  private datePipe = new DatePipe('es');

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
        price: this.currencyPipe.transform(row.price ?? 0, 'EUR', 'symbol', '1.2-2') ?? '0',
        expirationDate: this.datePipe.transform(row.expirationDate, 'dd/MM/yyyy') ?? '',
        category: this.translateService.instant(`category.${row.category}`) || (row.category ?? '')
      }
    }));
  }

  /**
   * Generates table row data from the given paginated results. Empty pages will be filled with the minimum information needed by the table component.
   * @param paginatedRows A map of paginated results, where the key is the page number and the value is the list of invoices for that page.
   * @param totalResults The table total elements count.
   * @param itemsPerPage The page size
   * @returns an array of table rows
   */
  public getTotalRows(paginatedRows: Map<number, Partial<ProductInterface>[]>, totalResults: number, itemsPerPage: number): Partial<ProductInterface>[] {
    // On empty map return empty list
    if (paginatedRows.size === 0) {
      return [];
    }
    // If the items per page are higher than the total results return the first page (all elements)
    const firstPageInMap: Partial<ProductInterface>[] = Array.from(paginatedRows.values())[0];
    if (firstPageInMap.length < itemsPerPage) {
      return firstPageInMap;
    }

    // Generates the table data with empty values
    let result: Partial<ProductInterface>[] = [...new Array(totalResults)].map(() => ({
      barcode: uniqueId(),
    }));

    // For every page...
    paginatedRows.forEach((rows: Partial<ProductInterface>[], key: number) => {
      /// ...for every element in that page...
      rows.forEach((row: Partial<ProductInterface>, index: number) => {
        // ...set the row data in the right position in the table data array
        result[(key - 1) * itemsPerPage + index] = row;
      });
    });

    return result;
  }

}
