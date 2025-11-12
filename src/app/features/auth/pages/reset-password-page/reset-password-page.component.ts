import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { basicNav, basicNG } from '../../../../shared/shared-imports';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [basicNG, basicNav],
  templateUrl: './reset-password-page.component.html',
})
export class ResetPasswordPageComponent {
  username = '';
  email = '';
  passkey = '';
  newPassword = '';
  message = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.resetPassword(this.username, this.email, this.passkey, this.newPassword).subscribe({
      next: () => {
        this.message = 'Password changed successfully!';
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to change password';
      },
    });
  }
}
