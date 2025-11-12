import { Component } from '@angular/core';
import { basicNav, basicNG } from '../../../../shared/shared-imports';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [basicNG, basicNav],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {}
