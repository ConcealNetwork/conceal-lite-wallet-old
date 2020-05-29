// Angular Core
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { DataService } from './data.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private DataService: DataService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.DataService.isLoggedIn) {
      this.router.navigate(['/lock']);
      return false;
    }
    return true;
  }
}