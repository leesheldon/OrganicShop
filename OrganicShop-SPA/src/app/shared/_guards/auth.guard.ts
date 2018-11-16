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
        
        if (this.authService.loggedIn()) {
            // User logged in already.
            
            // Validate user's role
            const roles = next.firstChild.data['roles'] as Array<string>;
            if (roles) {
                const matched = this.authService.roleMatch(roles);
                if (matched) {
                    return true;
                } else {
                    this.router.navigate(['/home']);
                    this.alertify.errorMsg('You are not authorized to access this area!');
                    return false;
                }
            } else {
                this.router.navigate(['/home']);
                this.alertify.errorMsg('This area is under construction!');
                return false;
            }
        }
        else {
            // User does not log in yet.
            this.alertify.errorMsg('You shall not pass!');
            this.router.navigate(['/login']);
            return false;
        }        
    }
}
