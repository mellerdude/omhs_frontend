import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { BoardListComponent } from '../../components/board-list/board-list.component';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

interface Task {
  id: string;
  title: string;
}

interface BoardList {
  id: string;
  name: string;
  tasks: Task[];
}

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [NgFor, BoardListComponent, CdkDropListGroup],
  templateUrl: './board-page.component.html',
})
export class BoardPageComponent {
  constructor(private auth: AuthService, private router: Router) {}

  boardLists: BoardList[] = [
    {
      id: '1',
      name: 'To Do',
      tasks: [
        { id: 't1', title: '📝 Setup project structure' },
        { id: 't2', title: '🔧 Configure Tailwind' },
      ],
    },
    {
      id: '2',
      name: 'In Progress',
      tasks: [{ id: 't3', title: '💻 Build board page' }],
    },
    {
      id: '3',
      name: 'Done',
      tasks: [{ id: 't4', title: '✅ Setup Angular project' }],
    },
  ];

  addList() {
    const newList: BoardList = {
      id: Date.now().toString(),
      name: 'New List',
      tasks: [],
    };
    this.boardLists.push(newList);
  }

  onLogout(): void {
  this.auth.logout();
  this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }
}
