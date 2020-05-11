import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HealthCare-UI';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('appcomponent- Init');
    this.authService.EmailAutoLogin();
  }
}
