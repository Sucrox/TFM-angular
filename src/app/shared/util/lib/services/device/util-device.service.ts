import { computed, Injectable, signal, Signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilDeviceService {
  public static readonly mobileBreakpointPx: number = 740;
  public readonly isMobile: Signal<boolean> = computed(() => this._isMobile());

  private _isMobile: WritableSignal<boolean> = signal(false);

  constructor() {
    console.log('Device Service initialized')
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.onWindowResize();
  }

  public onWindowResize(): void {
    this._isMobile.set(UtilDeviceService.mobileBreakpointPx >= window.innerWidth);
  }
}
