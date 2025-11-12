import { Component, Input } from '@angular/core';
import { BoardCardComponent } from '../board-card/board-card.component';

import { basicDragDrop, basicNG } from '../../../../shared/shared-imports';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
  selector: 'app-board-list',
  standalone: true,
  imports: [basicNG, BoardCardComponent, basicDragDrop],
  templateUrl: './board-list.component.html',
})
export class BoardListComponent {
  @Input() list!: BoardList;
  editingTitle = false;
  addingCard = false;
  newCardTitle = '';
  addCard() {
    this.addingCard = true;
    setTimeout(() => {
      const input = document.getElementById(`newCardInput-${this.list.id}`);
      input?.focus();
    });
  }

  saveNewCard() {
    const title = this.newCardTitle.trim();
    if (title) {
      this.list.tasks.push({
        id: Date.now().toString(),
        title,
      });
    }
    this.newCardTitle = '';
    this.addingCard = false;
  }
  startEdit() {
    this.editingTitle = true;
  }

  finishEdit(event: Event) {
    const input = event.target as HTMLInputElement;
    this.list.name = input.value.trim() || this.list.name;
    this.editingTitle = false;
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
