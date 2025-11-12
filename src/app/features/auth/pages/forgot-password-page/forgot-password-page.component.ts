import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { basicNav, basicNG } from '../../../../shared/shared-imports';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [basicNG, basicNav],
  templateUrl: './forgot-password-page.component.html',
})
export class ForgotPasswordPageComponent {
  username = '';
  email = '';
  message = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.forgotPassword(this.username, this.email).subscribe({
      next: () => {
        this.message = 'Passkey sent to your email.';
        setTimeout(() => this.router.navigate(['/auth/reset-password']), 2000);
      },
      error: (err) => {
        this.error = err.error?.error || 'Error sending passkey';
      },
    });
  }
}
