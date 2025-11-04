import { Routes } from '@angular/router';
import { BoardPageComponent } from './features/board/pages/board-page/board-page.component';

export const routes: Routes = [
  { path: 'board', component: BoardPageComponent },
  { path: '', redirectTo: 'board', pathMatch: 'full' },
];
