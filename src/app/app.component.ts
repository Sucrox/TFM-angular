import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import '@adrian_alonso/component-library/tfm-button';
import {FooterComponent} from '@tfm-angular/shared/ui';
import {NavbarComponent} from '@tfm-angular/shared/ui';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true
})
export class AppComponent {
  title = 'tfm-angular';

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');

    const supportedLangs = ['en', 'es'];
    const browserLang = translate.getBrowserLang();
    const matchedLang = supportedLangs.includes(browserLang ?? '') ? browserLang! : 'es';
    translate.use(matchedLang);
  }
}
