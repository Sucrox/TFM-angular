import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  InputSignal, output,
  OutputEmitterRef,
  Signal
} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {TableColumn, TableRow} from '@adrian_alonso/component-library/interfaces';
import {ProductInterface, ProductTableInterface} from '../../../products/domain/lib/product.interface';
import {TableService} from '../../util/table-utils.service';
import {tableHeadings} from '../../util/table-utils';
import {IconEnum} from '@adrian_alonso/component-library/enums';

@Component({
  selector: 'shopping-table',
  imports: [
    TranslatePipe
  ],
  templateUrl: './table.component.html',
  standalone: true,
  styleUrl: './table.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableComponent {

  private translateService: TranslateService= inject(TranslateService);
  public headings: TableColumn<ProductTableInterface>[];
  public readonly rows: InputSignal<Map<string, { product: ProductInterface; quantity: number }> | null>  = input<Map<string, { product: ProductInterface; quantity: number }> | null> (null);
  public readonly totalItems: InputSignal<number| null>= input<number | null>(null);
  public readonly itemsPerPage: InputSignal<number>= input<number>(10);

  public readonly tableService: TableService = inject(TableService)

  public readonly mappedRows: Signal<TableRow<any>[]> = computed(() => {
    return this.tableService.mapTableData(this.rows());
  });

  public readonly productDeleted: OutputEmitterRef<string> = output<string>();
  public readonly productIncrement: OutputEmitterRef< string > = output<string>();
  public readonly productDecrement: OutputEmitterRef< string > = output<string>();

  constructor() {
    const translate = (key: string) => this.translateService.instant(key);
    this.headings = this.initTableHeadings(translate);
  }

  private initTableHeadings(translate: (key: string) => string): TableColumn<ProductTableInterface>[] {
    return tableHeadings(this.onProductDecrement.bind(this),this.onProductIncrement.bind(this), this.onProductDeleted.bind(this),translate);
  }

  private onProductDeleted(rowData: TableRow<any>): void {
    this.productDeleted.emit(rowData.id);
  }
  private onProductIncrement(rowData: TableRow<any>): void {
    this.productIncrement.emit(rowData.id);
  }
  private onProductDecrement(rowData: TableRow<any>): void {
    this.productDecrement.emit(rowData.id);
  }

}
