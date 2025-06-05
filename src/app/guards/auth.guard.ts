import { CanActivateFn } from '@angular/router';
import { MixService } from '../services/mix.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const pokService = inject(MixService);
  return pokService.getAuthToken();
};
