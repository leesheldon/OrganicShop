import { AuthService } from "../_services/auth.service";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AlertifyService } from "../_services/alertify.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    canActivate(next: ActivatedRouteSnapshot): boolean {
        const roles = next.firstChild.data['roles'] as Array<string>;
        if (roles) {
            const matched = this.authService.roleMatch(roles);
            if (matched) {
                return true;
            } else {
                this.router.navigate(['/home']);
                this.alertify.errorMsg('You are not authorized to access this area!');
            }
        }

        if (this.authService.loggedIn()) {
            return true;
        }

        this.alertify.errorMsg('You shall not pass!');
        this.router.navigate(['/login']);
        return false;
    }
}
