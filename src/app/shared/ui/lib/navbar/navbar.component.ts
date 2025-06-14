import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import {ControlValueAccessorDirective} from '@adrian_alonso/angular-utils-library';
import {LangChangeEvent, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {
  CountryFlagEnum,
  CountryInitialsEnum,
  CountryPrefixEnum,
  PrefixTypeEnum,
  Theme
} from '@adrian_alonso/component-library/enums';
import {Country} from '@adrian_alonso/component-library/interfaces';
import {LangsEnum} from '../../../domain/lib/enums/langs-enum';
import "@adrian_alonso/component-library/tfm-prefix-selector"

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

  private translateService: TranslateService = inject(TranslateService)

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

}
