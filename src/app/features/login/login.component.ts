import {Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import {CredentialFormComponent} from '@tfm-angular/login/ui';
import {TranslateModule} from '@ngx-translate/core';
import {DataAccessAuthService} from '@tfm-angular/shared/data-access';
import {LoginDomainForm} from '@tfm-angular/login/domain';

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

  private readonly authService: DataAccessAuthService = inject(DataAccessAuthService);

  public login(loginData: LoginDomainForm) : void {
    this.authService.login(loginData);
  }
}
