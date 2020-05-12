import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authUserSub: Subscription;

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log('Header Loaded');
    console.log(this.authService._contextUser);

    if (this.authService._contextUser) {
      this.authUserSub = this.authService._contextUser.subscribe(user => {
        this.isAuthenticated = user ? true : false;
      });
    }
  }

  ngOnDestroy() {
    this.authUserSub.unsubscribe();
  }

  onLogout() {
    if (this.isAuthenticated) {
      this.authService.EmailLogout();
    }
  }

}
