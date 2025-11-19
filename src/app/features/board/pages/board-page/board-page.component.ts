import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import {
  KanbanService,
  Kanban,
  BoardList,
} from '../../../../core/services/kanban.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BoardListComponent } from '../../components/board-list/board-list.component';
import { basicDragDrop, basicNG } from '../../../../shared/shared-imports';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [BoardListComponent, basicNG, basicDragDrop],
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
  connectedTaskLists: string[] = [];

  ngOnInit(): void {
    this.kanban.getKanban().subscribe({
      next: (res) => {
        this.kanbanData = res;
        this.boardLists = res.boards[0].lists;

        // IMPORTANT — must be inside subscribe
        this.connectedTaskLists = this.boardLists.map((l) => `tasks-${l.id}`);
      },
    });
  }

  addList() {
    const newList: BoardList = {
      id: Date.now().toString(),
      title: 'New List',
      tasks: [],
    };

    this.boardLists.push(newList);

    // update connection list
    this.connectedTaskLists = this.boardLists.map((l) => `tasks-${l.id}`);

    this.save();
  }

  onListDropped(event: CdkDragDrop<BoardList[]>) {
    moveItemInArray(this.boardLists, event.previousIndex, event.currentIndex);
    this.save();
  }

  save() {
    this.kanbanData.boards[0].lists = this.boardLists;
    this.kanban.updateKanban(this.kanbanData).subscribe();
  }

  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/auth/login');
  }

  removeList(index: number) {
    this.boardLists.splice(index, 1);
    this.save();
  }
}
