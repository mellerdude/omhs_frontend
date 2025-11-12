import { Routes } from '@angular/router';
import { BoardPageComponent } from './features/board/pages/board-page/board-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginPageComponent },
  { path: 'board', component: BoardPageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'board', pathMatch: 'full' },
];
