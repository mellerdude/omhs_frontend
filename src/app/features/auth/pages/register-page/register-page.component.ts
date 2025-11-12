import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { basicNav, basicNG } from '../../../../shared/shared-imports';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [basicNG, basicNav],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  username = '';
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    this.auth.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.success = 'Account created! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: (err) => {
        this.error = err.error?.error || 'Registration failed';
      },
    });
  }
}
