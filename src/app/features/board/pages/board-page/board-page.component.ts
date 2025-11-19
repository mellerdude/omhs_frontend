import { Component, OnInit } from '@angular/core';
import { BoardListComponent } from '../../components/board-list/board-list.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { basicDragDrop, basicNG } from '../../../../shared/shared-imports';
import { KanbanService, Kanban, BoardList } from '../../../../core/services/kanban.service';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [basicNG, BoardListComponent, basicDragDrop],
  templateUrl: './board-page.component.html',
})
export class BoardPageComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private kanban: KanbanService
  ) {}

  kanbanData!: Kanban;
  boardLists: BoardList[] = [];

  ngOnInit(): void {
    this.kanban.getKanban().subscribe({
      next: (res) => {
        this.kanbanData = res;
        this.boardLists = res.boards[0].lists;
      },
      error: () => {
        console.error('Failed to load kanban');
      }
    });
  }

  addList() {
    const newList: BoardList = {
      id: Date.now().toString(),
      title: 'New List', // <-- FIXED HERE
      tasks: [],
    };

    this.boardLists.push(newList);
    this.save();
  }

  save() {
    this.kanbanData.boards[0].lists = this.boardLists;
    this.kanban.updateKanban(this.kanbanData).subscribe();
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }
}
