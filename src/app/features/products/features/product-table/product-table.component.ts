import {
  Component, computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef, Signal
} from '@angular/core';
import '@adrian_alonso/component-library/tfm-table';
import {
  ItemsPerPageChangeEvent,
  PageChangeDetail,
  PageChangeEvent,
  TableColumn,
  TableRow
} from '@adrian_alonso/component-library/interfaces';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ProductInterface, ProductTableInterface} from '../../domain/lib/product.interface';
import {tableHeadings} from '../../util/lib/table.utils';
import {TableService} from '../../util/lib/table-util.service';
import {TablePageChangeEvent} from '../../../../shared/domain/lib/interfaces/table.interface';
import {TableItemsPerPageEnum} from '@adrian_alonso/component-library/enums';

@Component({
  selector: 'tfm-product-table',
  imports: [
    TranslatePipe
  ],
  templateUrl: './product-table.component.html',
  standalone: true,
  styleUrl: './product-table.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductTableComponent{

  private translateService: TranslateService= inject(TranslateService)

  //Inputs
  public headings: TableColumn<ProductTableInterface>[];
  public readonly rows: InputSignal<Partial<ProductInterface>[]>  = input<Partial<ProductInterface>[]> ([]);
  public isLoading: InputSignal<boolean>= input<boolean>(false);
  public readonly totalItems: InputSignal<number| null>= input<number | null>(null);
  public readonly itemsPerPage: InputSignal<number>= input<number>(10);
  public readonly currentPage: InputSignal<number>= input<number>(1);

  public readonly tableService: TableService = inject(TableService)

  public readonly mappedRows: Signal<TableRow<ProductTableInterface>[]> = computed(() => {
    return this.tableService.mapTableData(this.rows());
  });

  //Outputs
  public readonly pageChange: OutputEmitterRef<TablePageChangeEvent> = output<TablePageChangeEvent>();
  public readonly changePageSize: OutputEmitterRef<number> = output<number>();
  public readonly productSelected: OutputEmitterRef<string> = output<string>();
  public readonly productNameClick: OutputEmitterRef<string> = output<string>();

  constructor() {
    const translate = (key: string) => this.translateService.instant(key);
    this.headings = this.initTableHeadings(translate);
  }

  private initTableHeadings(translate: (key: string) => string): TableColumn<ProductTableInterface>[] {
    return tableHeadings(this.onProductNameClick.bind(this),this.onProductSelected.bind(this), translate);
  }

  private onProductSelected(rowData: TableRow<ProductTableInterface>) {
    this.productSelected.emit(rowData.id);
  }
  private onProductNameClick(rowData: TableRow<ProductTableInterface>) {
    this.productNameClick.emit(rowData.id);
  }

  public onPageChange(event: Event) {
    const details: PageChangeDetail = (event as PageChangeEvent).detail;
    const newPage: number = details.newPage;
    const firstInPage: number = newPage === 1 ? 1 : (newPage * this.itemsPerPage() - (this.itemsPerPage()))
    const lastInPage: number = newPage === 1 ? this.itemsPerPage() : firstInPage + this.itemsPerPage() -1;
    this.pageChange.emit({firstInPage,lastInPage,page:newPage})
  }

  public onItemsPerPageChange(event: Event) {
    const details: TableItemsPerPageEnum = (event as ItemsPerPageChangeEvent).detail;
    this.changePageSize.emit(details)
  }
}
