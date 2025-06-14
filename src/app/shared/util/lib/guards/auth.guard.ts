import {Router} from '@angular/router';
import {inject} from '@angular/core';
import {DataAccessAuthService} from '@tfm-angular/shared/data-access';
import {DomainRoutesEnum} from '@tfm-angular/shared/domain';

export function authGuard(): boolean{
  const router: Router = inject(Router);
  const authService: DataAccessAuthService = inject(DataAccessAuthService);

  if (!authService.isAuthenticated()) {
    const currentUrl = router.url;

    const isOnLoginOrRegister =
      currentUrl.includes(DomainRoutesEnum.LOGIN) ||
      currentUrl.includes(DomainRoutesEnum.REGISTER);

    if (!isOnLoginOrRegister) {
      router.navigate([DomainRoutesEnum.LOGIN]);
    }
    return false;
  }

  return true;
}
