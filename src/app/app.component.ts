import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  OnInit,
  Signal,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import '@adrian_alonso/component-library/tfm-button';
import {FooterComponent} from '@tfm-angular/shared/ui';
import {NavbarComponent} from '@tfm-angular/shared/ui';
import {AppStore, DataAccessAuthService} from '@tfm-angular/shared/data-access';
import {UtilDialogService} from './shared/util/lib/services/dialog/dialog.service';
import {UiDialogComponent} from './shared/ui/lib/dialog/dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent, UiDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class AppComponent implements OnInit{
  title = 'tfm-angular';

  private readonly state = inject(AppStore);
  private readonly authService: DataAccessAuthService = inject(DataAccessAuthService);
  private readonly dialogService: UtilDialogService = inject(UtilDialogService);

  public readonly dialogContainer: Signal<ViewContainerRef> = viewChild.required('dialogContainer', {read: ViewContainerRef});
  public readonly dialogElement: Signal<UiDialogComponent> = viewChild.required('dialogElement');

  constructor() {
    effect(() => {
      const user = this.state.user();
      const phone = user?.phone;

      const isIncompleteUser =
        !user?.firstName ||
        !user?.familyName ||
        !user?.email ||
        !user?.dni;

      if (this.authService.isAuthenticated() && phone && isIncompleteUser) {
        this.state.fetchUser().subscribe();
      }
    });
  }

  public ngOnInit() {
    console.log('inicializo')
    this.dialogService.init(this.dialogElement(), this.dialogContainer(), 'Close')
  }

}
