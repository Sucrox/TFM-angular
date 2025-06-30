import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'tfm-footer',
  imports: [
    TranslatePipe
  ],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterComponent {

}
