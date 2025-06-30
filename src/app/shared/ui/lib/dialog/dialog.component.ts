import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  HostListener,
  inject,
  Input,
  Signal,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {UtilDialogService} from '@tfm-angular/shared/util';
import {ButtonType, IconEnum, KeyupSpecialKeys, Theme} from '@adrian_alonso/component-library/enums';
import {DomainAction} from '@tfm-angular/shared/domain';
import "@adrian_alonso/component-library/tfm-button"
import "@adrian_alonso/component-library/tfm-icon-button"
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'tfm-dialog',
  imports: [
    TranslatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <dialog #dialog class="dialog" [attr.aria-label]="title || ariaLabel">
      <header #header class="dialog__header" [class.dialog__header--no-title]="!title">
        @if (title) {
          <h3 class="ui-label-bold">{{ title | translate }}</h3>
        }
                @if (canClose) {
                  <tfm-icon-button
                    (click)="closeDialog()"
                    [icon]="IconEnum.X_OUTLINE"
                    [variant]="ButtonType.ACCESSORY"
                    (keydown.enter)="$event.preventDefault(); closeDialog()"
                    class="header__close"
                    [theme]="Theme.DARK"
                  ></tfm-icon-button>
                }
      </header>
      @if (actions.length) {
        <footer class="dialog__footer">
          @for (action of actions; track action.label) {
            <tfm-button
              [label]="action.label"
              (click)="action.callback()"
              class="footer__action"></tfm-button>
          }
        </footer>
      }
    </dialog>
  `,
  styleUrl: './dialog.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class UiDialogComponent {
  @Input() title: string = '';
  @Input() ariaLabel: string = '';
  @Input() canClose: boolean = true;
  @Input() actions: DomainAction[] = [];
  @Input() closeAlt: string = '';
  @Input() data: Record<string, any> = {};

  public readonly dialogService: UtilDialogService = inject(UtilDialogService);
  private readonly dialog: Signal<ElementRef<HTMLDialogElement>> = viewChild.required('dialog');
  private readonly dialogHeaderRef: Signal<ViewContainerRef> = viewChild.required('header', {read: ViewContainerRef});

  constructor() {
    effect(() => {
      if (this.dialogService.dialogContentRef()) {
        this.dialog().nativeElement.showModal();
        Object.keys(this.data).forEach((key: string) => {
          this.dialogService.dialogContentRef()?.setInput(key, this.data[key]);
        })
        this.dialogHeaderRef().insert(this.dialogService.dialogContentRef()!.hostView);
      }
    });
  }

  @HostListener('keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    if (event.key === KeyupSpecialKeys.ESC) {
      this.closeDialog(null);
    }
  }

  public closeDialog(value?: any, callService: boolean = true): void {
    this.dialog().nativeElement.close(value);
    if (callService) {
      this.dialogService.close(value);
    }
  }

  protected readonly Theme = Theme;
  protected readonly IconEnum = IconEnum;
  protected readonly ButtonType = ButtonType;
}
