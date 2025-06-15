import {Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import {CredentialFormComponent} from '@tfm-angular/register/ui';
import {RegisterDomainForm} from '@tfm-angular/register/domain';
import {DataAccessAuthService} from '@tfm-angular/shared/data-access';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [
    CredentialFormComponent,
    TranslatePipe
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class RegisterComponent {

  private readonly authService: DataAccessAuthService = inject(DataAccessAuthService);

  public register(registerData: RegisterDomainForm) : void {
    this.authService.register(registerData);
  }

}
