import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouterAccessService {

  private homeRoute: boolean;

  constructor() {
    this.homeRoute = false;
  }

  getAccessRoute(route: string) {
    switch (route) {
      case '/home':
        return this.homeRoute;
        break;
    }
  }

  setAccessRoute(route: string, access: boolean) {
    switch (route) {
      case '/home':
        this.homeRoute = access;
        break;
    }
  }

}
