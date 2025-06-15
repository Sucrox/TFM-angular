import { ComponentRef, computed, inject, Injectable, Injector, Signal, signal, Type, ViewContainerRef, WritableSignal } from '@angular/core';
import { first, Observable, Subject } from 'rxjs';
import {UiDialogComponent} from '../../../../ui/lib/dialog/dialog.component';
import {UtilDeviceService} from '../device/util-device.service';
import {defaultOptionDialog, DialogInterface} from '../../../../domain/lib/interfaces/dialog.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilDialogService {
  private static readonly initError: Error = new Error('Service not initialized. Please use init method to initialize service');
  public readonly dialogContentRef: WritableSignal<ComponentRef<any> | null> = signal(null);

  private readonly isDialogOpen: Signal<boolean> = computed(() => !!this.dialogContentRef());
  private readonly onDialgoClose$: Subject<any> = new Subject<any>();
  private dialogContainer?: ViewContainerRef;
  private dialogElement?: UiDialogComponent;
  private readonly injector: Injector = inject(Injector);
  private readonly deviceService: UtilDeviceService = inject(UtilDeviceService);
  private closeAlt: string = '';

  private get isInitialized(): boolean {
    return Boolean(this.dialogElement && this.dialogContainer);
  }

  /**
   * Initializes the dialog service
   * @param dialogElement The `UiDialogComponent`
   * @param dialogContainer The `ng-container` inside the `UiDialogComponent` to fill the dialog's body
   * @param localizedCloseAlt The localized alt text for the close icon button
   */
  public init(dialogElement: UiDialogComponent, dialogContainer: ViewContainerRef, localizedCloseAlt: string = ''): void {
    this.dialogElement = dialogElement;
    this.dialogContainer = dialogContainer;
    this.closeAlt = localizedCloseAlt;
    console.log('Dialog service initialized');
  }

  /**
   * Opens a dialog with the provided component as dialog's body.
   * If a dialog was already opened, it gets closed in favour of the new dialog.
   * @param dialog The dialog body component
   * @param options The dialog options
   * @param options.title The dialog title visible in the dialog's header
   * @param options.canClose Displays the dialog close icon on the header's top-right. Default is true
   * @param options.actions The set of button and links rendered in the dialog's footer
   * @returns An Observable that emits when the dialog closes. The value is the provided value from the service `close` API
   * @throws Error if called before `UtilDialogService.init`
   * @see UiDialogComponent
   * @see Action
   * @see UtilDialogService.close
   */
  public open<T extends Type<unknown>>(dialog: T, options: DialogInterface = defaultOptionDialog): Observable<any> {
    if (!this.isInitialized) {
      throw UtilDialogService.initError;
    }
    if (this.isDialogOpen()) {
      this.close();
    }
    this.dialogElement!.title = options.title ?? defaultOptionDialog.title ?? '';
    if (options.ariaLabel) {
      this.dialogElement!.ariaLabel = options.ariaLabel;
    }
    this.dialogElement!.canClose = options.canClose ?? defaultOptionDialog.canClose ?? true;
    this.dialogElement!.actions = options.actions ?? defaultOptionDialog.actions ?? [];
    this.dialogElement!.closeAlt = options.closeAlt || this.closeAlt;
    this.dialogElement!.data = options.data || {};
    this.dialogContentRef.set(this.dialogContainer!.createComponent(dialog, { injector: options.injector ?? this.injector }));
    this.setBodyScroll(false);
    return this.onDialgoClose$.asObservable().pipe(first());
  }

  /**
   * Closes the dialog making the UtilDialogService.open returned Observable emit the provided value
   * @param value The value emitted
   * @throws Error if called before `UtilDialogService.init`
   */
  public close(value: any = null): void {
    if (!this.isInitialized) {
      throw UtilDialogService.initError;
    }
    this.dialogElement?.closeDialog(value, false);
    this.onDialgoClose$.next(value);
    this.dialogContentRef()?.destroy();
    this.dialogContentRef.set(null);
    this.setBodyScroll(true);
  }

  private setBodyScroll(canScroll: boolean): void {
    if (canScroll) {
      document.body.style.overflowY = 'auto';
      if (!this.deviceService.isMobile()) {
        document.body.style.marginRight = '0';
      }
    } else {
      document.body.style.overflowY = 'hidden';
      if (!this.deviceService.isMobile()) {
        document.body.style.marginRight = '15px';
      }
    }
  }

}
