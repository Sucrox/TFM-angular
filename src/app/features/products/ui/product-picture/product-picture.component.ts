import {Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input, InputSignal, Signal} from '@angular/core';
import {Img} from '@tfm-angular/shared/domain';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'product-picture',
  imports: [],
  template: `
    <img
         [src]="productPicImg().src"
         [alt]="productPicImg().alt"
         class="product-pic">
  `,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: [`
    .product-pic {
      margin: auto;
      border-radius: 9rem;
      width: 90%;
      height: 90%;
    }
  `]
})
export class ProductPictureComponent {
  private readonly translate = inject(TranslateService);

  public static readonly productPicPlaceholder: string = 'assets/products/food-placeholder.jpg';

  public productPic: InputSignal<string> = input.required<string>();

  public productPicImg: Signal<Img<string>> = computed(() => ({
    src: this.productPic(),
    alt: this.translate.instant('profile.imagAlt')
  }));

}
