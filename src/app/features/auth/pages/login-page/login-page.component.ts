import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { basicNav, basicNG } from '../../../../shared/shared-imports';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [basicNav, basicNG],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/board']),
      error: () => this.error = 'Invalid username or password',
    });
  }
}
