import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject, OnDestroy,
  OnInit,
  Signal,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import {NavigationEnd, Event, Router, RouterOutlet} from '@angular/router';
import '@adrian_alonso/component-library/tfm-button';
import {FooterComponent, NavbarComponent} from '@tfm-angular/shared/ui';
import {AppStore, DataAccessAuthService, UserState} from '@tfm-angular/shared/data-access';
import {UtilDialogService} from './shared/util/lib/services/dialog/dialog.service';
import {UiDialogComponent} from './shared/ui/lib/dialog/dialog.component';
import {DomainRoutesEnum, HeaderLink} from '@tfm-angular/shared/domain';
import {environment} from '@environments';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map} from 'rxjs';
import {UserInterface} from './shared/domain/lib/interfaces/user.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent, UiDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'tfm-angular';

  private readonly state = inject(AppStore);
  private readonly authService: DataAccessAuthService = inject(DataAccessAuthService);
  private readonly dialogService: UtilDialogService = inject(UtilDialogService);
  private readonly router: Router = inject(Router);

  public readonly routes: Signal<HeaderLink[]> = computed(this.getAppRoutes.bind(this));
  public readonly user: Signal<UserState | null> = computed(() => this.state.user());
  public readonly isLogin: Signal<boolean>= computed(() => this.currentRoute().includes(DomainRoutesEnum.LOGIN) || this.currentRoute().includes(DomainRoutesEnum.REGISTER) )
  public readonly currentRoute: Signal<DomainRoutesEnum> = this.getCurrentRoute();

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
    this.dialogService.init(this.dialogElement(), this.dialogContainer(), 'Close')
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.handleBeforeUnload.bind(this));
  }

  public logout(): void{
    this.authService.logout();
  }

  private getAppRoutes(): HeaderLink[] {
    return  this.isLogin() ? [] : environment.routes;
  }

  private getCurrentRoute(): Signal<DomainRoutesEnum>{
    return toSignal(this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      map(() => this.router.url.replace('/','') as DomainRoutesEnum),
    ), {initialValue: DomainRoutesEnum.PRODUCTS});
  }

  private handleBeforeUnload(event: BeforeUnloadEvent): void {
    this.logout();
  }

}
