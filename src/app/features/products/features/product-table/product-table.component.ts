import {
  Component, computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect, inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef, Signal
} from '@angular/core';
import '@adrian_alonso/component-library/tfm-table';
import {ProductTableInterface} from '../../domain/lib/product-table.interface';
import {TableColumn, TableRow} from '@adrian_alonso/component-library/interfaces';
import {Event} from '@angular/router';
import {TableItemsPerPageEnum} from '@adrian_alonso/component-library/enums';
import {TranslatePipe} from '@ngx-translate/core';
import {ProductInterface} from '../../domain/lib/product.interface';
import {tableHeadings} from '../../ui/lib/table.utils';
import {TableService} from '../../ui/lib/table-util.service';

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

  //Inputs
  public readonly headings: TableColumn<ProductTableInterface>[] = tableHeadings;
  public readonly rows: InputSignal<ProductInterface[]>  = input<ProductInterface[]> ([]);
  public isLoading: InputSignal<boolean>= input<boolean>(false);
  public readonly totalItems: InputSignal<number| null>= input<number | null>(null);
  public readonly itemsPerPage: InputSignal<number>= input<number>(10);

  public readonly tableService: TableService = inject(TableService)

  public readonly mappedRows: Signal<TableRow<ProductTableInterface>[]> = computed(() => {
    return this.tableService.mapTableData(this.rows());
  });

  //Outputs
  // public readonly pageChange: OutputEmitterRef<TablePageC>
    public readonly changePageSize: OutputEmitterRef<number> = output<number>();

  public onItemsPerPageChange(event: Event) {
    const details = (event as unknown as CustomEvent<TableItemsPerPageEnum>).detail;
    this.changePageSize.emit(details);
  }

  constructor() {
    effect(() => {
      console.log(this.rows())
      console.log(this.headings)
    });
  }
}
