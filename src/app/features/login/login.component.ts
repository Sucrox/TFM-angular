import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CredentialFormComponent} from '@tfm-angular/login/ui';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    CredentialFormComponent,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
