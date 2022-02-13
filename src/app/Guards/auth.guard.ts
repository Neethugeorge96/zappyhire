import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { IndexedDBService } from '../Services/indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authservice: AuthService,
    private indexedDB:IndexedDBService,
    private router: Router,
    ) { }
  canActivate(): boolean {

    // if (this._authservice.isLoggedIn()) {
    //   return true;
    // }
    if (this.indexedDB.isLoggedIn()) {
      return true;
    }

    else {
      this.router.navigate(['/auth'])
      return false
    }
  }

}
