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
import {Img} from '../../../domain/lib/interfaces/img.interface';
import {UtilDialogService} from '../../../util/lib/services/dialog/dialog.service';
import {IconEnum, KeyupSpecialKeys} from '@adrian_alonso/component-library/enums';
import {DomainAction} from '../../../domain/lib/interfaces/actions';
import "@adrian_alonso/component-library/tfm-button"

@Component({
  selector: 'tfm-dialog',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <dialog #dialog class="dialog" [attr.aria-label]="title || ariaLabel">
      <header #header class="dialog__header" [class.dialog__header--no-title]="!title">
        @if (title) {
          <h3 class="ui-label-bold">{{ title }}</h3>
        }
        <!--        @if (canClose) {-->
        <!--          <ltm-icon [icon]="closeIcon.src"-->
        <!--                   [alt]="closeAlt"-->
        <!--                   [sizeRem]="1.5"-->
        <!--                   color="var(&#45;&#45;light-color)"-->
        <!--                   tabindex="0"-->
        <!--                   class="header__close"-->
        <!--                   (click)="closeDialog()"-->
        <!--                   (keydown.enter)="$event.preventDefault(); closeDialog()"/>-->
        <!--        }-->
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

  public readonly closeIcon: Img<IconEnum> = { src: IconEnum.CLOSE_FILL, alt: this.closeAlt };
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
}
