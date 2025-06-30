import {
  Component, computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  InputSignal,
  OnInit, output,
  OutputEmitterRef, Signal
} from '@angular/core';
import {ControlValueAccessorDirective} from '@adrian_alonso/angular-utils-library';
import {LangChangeEvent, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {
  ButtonType,
  CountryFlagEnum,
  CountryInitialsEnum,
  CountryPrefixEnum,
  PrefixTypeEnum,
  Theme, UserTypeEnum
} from '@adrian_alonso/component-library/enums';
import {Country} from '@adrian_alonso/component-library/interfaces';
import {LangsEnum} from '@tfm-angular/shared/domain';
import "@adrian_alonso/component-library/tfm-prefix-selector"
import "@adrian_alonso/component-library/tfm-user-widget"
import {DomainRoutesEnum, HeaderLink} from '@tfm-angular/shared/domain';
import {Router} from '@angular/router';
import {UserState} from '@tfm-angular/shared/data-access';


@Component({
  selector: 'tfm-navbar',
  imports: [
    ControlValueAccessorDirective,
    TranslatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarComponent implements OnInit{

  public readonly isLogin: InputSignal<boolean> = input<boolean>(true);
  public readonly user: InputSignal<UserState | null> = input.required();
  public routes: InputSignal<HeaderLink[]> = input.required();

  public fullName: Signal<string> = computed(() =>
    `${this.user()?.firstName} ${this.user()?.familyName}`
  );

  public initials: Signal<string> = computed(() => {
    const firstInitial = this.user()?.firstName?.charAt(0).toUpperCase() || '';
    const lastInitial = this.user()?.familyName?.charAt(0).toUpperCase() || '';
    return firstInitial + lastInitial;
  });

  public readonly logout: OutputEmitterRef<void> = output<void>();

  private translateService: TranslateService = inject(TranslateService)
  public readonly router: Router = inject(Router)

  public readonly userWidgetTheme : Theme = Theme.DARK;
  public readonly langWidgetType : PrefixTypeEnum = PrefixTypeEnum.INITIALS;
  public readonly supportedLangs: Country[] = [
    {flag: CountryFlagEnum.ES, initials: CountryInitialsEnum.ES, prefix:CountryPrefixEnum.ES},
    {flag: CountryFlagEnum.GB, initials: CountryInitialsEnum.GB, prefix:CountryPrefixEnum.GB}
  ]


  public readonly languageWidget: FormControl<CountryInitialsEnum> = new FormControl(CountryInitialsEnum.ES, {nonNullable: true})

  public ngOnInit() {
    this.getLangInfo()
  }

  public goTo(route:DomainRoutesEnum): void{
    this.router.navigate([route], {state: {from: this.router.url}});
  }

  public isActiveRoute(route: DomainRoutesEnum): boolean{
    return this.router.url.replace('/','').includes(route);
  }

  private getLangInfo(): void {
    this.languageWidget.valueChanges.subscribe(this.onLanguageSelection.bind(this));
    this.selectLanguage(this.translateService.currentLang as LangsEnum);
    this.translateService.onLangChange.subscribe(( event: LangChangeEvent) => {
      this.selectLanguage(event.lang as LangsEnum)
    })
  }

  private selectLanguage( lang: LangsEnum): void {
    let optionToSelect : Country;
    switch (lang){
      case LangsEnum.ES:
        optionToSelect= this.supportedLangs.find((lang: Country) => lang.initials === CountryInitialsEnum.ES)!;
        break;
      case LangsEnum.EN:
        optionToSelect= this.supportedLangs.find((lang: Country) => lang.initials === CountryInitialsEnum.GB)!;
        break;
    }
    if (optionToSelect){
      this.languageWidget.setValue(optionToSelect.initials)
    }

  }

  private onLanguageSelection( lang: CountryInitialsEnum): void{
    switch (lang){
      case CountryInitialsEnum.ES:
        this.translateService.use(LangsEnum.ES)
        break;
      case CountryInitialsEnum.GB:
        this.translateService.use(LangsEnum.EN)
        break;
    }
  }

  protected readonly Theme = Theme;
  protected readonly UserTypeEnum = UserTypeEnum;
  protected readonly DomainRoutesEnum = DomainRoutesEnum;
  protected readonly ButtonType = ButtonType;
}
