import {Router} from '@angular/router';
import {inject} from '@angular/core';
import {DataAccessAuthService} from '@tfm-angular/shared/data-access';
import {DomainRoutesEnum} from '@tfm-angular/shared/domain';

export function loggedAuthGuard(): boolean {
  const router: Router = inject(Router);
  const authService: DataAccessAuthService = inject(DataAccessAuthService);

  if (authService.isAuthenticated()) {
    router.navigate([DomainRoutesEnum.PROFILE]);
    return false;
  }

  return true;
}
