import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';

@Component({
    selector: 'pm-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

    pageTitle = "Acme Product Management";

    constructor(private router: Router,
        private authService: AuthService) {}

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    get userName(): string {
        if (this.authService.currentUser) {
            return this.authService.currentUser.userName;
        }
    }

    logOut(): void {
        this.authService.logout();
        this.router.navigate(['/welcome']);
    }

    ngOnInit() {

    }
}