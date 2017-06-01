import { UIRouter } from '@uirouter/angular';
import {Injector} from '@angular/core';
import { SharedVariables } from '../shared/shared.variables';


// ui-router config
export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  let  checkLogin = injector.get(SharedVariables);
  // Pre-load username at startup.
  let username = checkLogin.username;
  // check username exists or not
  if(!username) {
    router.urlService.url('/login');
  }
  // If no URL matches, go to the `login` state by default
  router.urlService.rules.otherwise({ state: 'login' });

}
