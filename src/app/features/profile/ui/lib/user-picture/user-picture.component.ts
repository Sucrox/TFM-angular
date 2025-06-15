import {Component, computed, CUSTOM_ELEMENTS_SCHEMA, input, InputSignal, Signal} from '@angular/core';
import {Img} from '../../../../../shared/domain/lib/interfaces/img.interface';

@Component({
  selector: 'profile-user-picture',
  imports: [],
  template: `
    <img
         [src]="propicImg().src"
         [alt]="propicImg().alt"
         class="propic">
  `,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: [`
    .propic {
      border-radius: 12.1875rem;
      width: 195px;
      height: 195px;
    }
    .ui-label {
      text-align: center;
      margin-top: .5rem;
    }
  `]
})
export class ProfileUserPictureComponent {
  public static readonly propicPlaceholder: string = 'assets/profile/propic-placeholder.jpg';

  public propic: InputSignal<string> = input.required<string>();

  public propicImg: Signal<Img<string>> = computed(() => ({
    src: this.propic(),
    alt: 'Immagine profilo'
  }));
}



