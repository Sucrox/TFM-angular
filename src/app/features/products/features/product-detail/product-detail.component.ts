import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, Signal, signal, WritableSignal} from '@angular/core';
import {ProductInterface} from '@tfm-angular/products/domain';
import {UtilDialogService} from '@tfm-angular/shared/util';
import {ProductPictureComponent} from '@tfm-angular/products/ui';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import "@adrian_alonso/component-library/tfm-input"
import "@adrian_alonso/component-library/tfm-button"
import {ControlValueAccessorDirective} from '@adrian_alonso/angular-utils-library';
import {InputTypeEnum} from '@tfm-angular/shared/domain';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'tfm-product-detail',
  imports: [
    ProductPictureComponent,
    CurrencyPipe,
    TranslatePipe,
    DatePipe,
    ControlValueAccessorDirective,
    ReactiveFormsModule
  ],
  templateUrl: './product-detail.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  private readonly dialogService: UtilDialogService = inject(UtilDialogService)

  public product: Signal<ProductInterface> = input.required<ProductInterface>();


  public productPic: WritableSignal<string> = signal<string>(ProductPictureComponent.productPicPlaceholder)

  protected readonly InputTypeEnum: typeof InputTypeEnum= InputTypeEnum;

  public quantity: FormControl<number | null> = new FormControl<number | null>(1, [Validators.required, Validators.min(1)]);


  public addProductToCart() {
    this.dialogService.close(this.quantity.value);
  }

}
