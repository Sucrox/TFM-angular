import {inject, Injectable} from '@angular/core';
import {TableRow} from '@adrian_alonso/component-library/interfaces';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {ProductInterface} from '../../products/domain/lib/product.interface';
import {ButtonType, IconEnum} from '@adrian_alonso/component-library/enums';

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
  public mapTableData(  rows: Map<string, { product: ProductInterface; quantity: number }> | null): TableRow<any>[] {
    if (!rows || rows.size === 0) {
      return [];
    }


    return Array.from(rows.entries()).map(([barcode, { product, quantity }]) => ({
      id: barcode,
      data: {
        name: `<tfm-link label="${product.name}" style="width: 100%; display: block"></tfm-link>`,
        decrement: `
        <tfm-icon-button
          variant="${ButtonType.ACCESSORY}"
          icon="${IconEnum.CARET_LEFT_OUTLINE}"
        ></tfm-icon-button>
      `,
        quantity: `<span style="display: inline-block; min-width: 2rem; text-align: center;">${quantity}</span>`,
        increment: `
        <tfm-icon-button
          variant="${ButtonType.ACCESSORY}"
          icon="${IconEnum.CARET_RIGHT_OUTLINE}"
        ></tfm-icon-button>
      `,
        price:
          this.currencyPipe.transform(product.price ?? 0, 'EUR', 'symbol', '1.2-2') ??
          '0',
        delete: `
        <tfm-icon-button
          icon="${IconEnum.TRASH_FILL}"
          variant="${ButtonType.ACCESSORY}"
        ></tfm-icon-button>
      `,
      },
    }));
  }
}
