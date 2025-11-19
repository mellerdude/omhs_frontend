import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BoardCardComponent } from '../board-card/board-card.component';

import { basicDragDrop, basicNG } from '../../../../shared/shared-imports';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

interface Task {
  id: string;
  title: string;
}

interface BoardList {
  id: string;
  title: string;
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
  @Input() connectedTaskLists: string[] = [];
  @Output() deleteList = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  editingTitle = false;
  addingCard = false;
  newCardTitle = '';

  addCard() {
    this.addingCard = true;
    setTimeout(() => {
      document.getElementById(`newCardInput-${this.list.id}`)?.focus();
    });
  }

  saveNewCard() {
    const title = this.newCardTitle.trim();
    if (title) {
      this.list.tasks.push({
        id: Date.now().toString(),
        title,
      });
      this.changed.emit();
    }
    this.newCardTitle = '';
    this.addingCard = false;
  }

  startEdit() {
    this.editingTitle = true;
  }

  finishEdit(event: Event) {
    const input = event.target as HTMLInputElement;
    this.list.title = input.value.trim() || this.list.title;
    this.editingTitle = false;
    this.changed.emit();
  }

  drop(event: CdkDragDrop<Task[]>) {
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
    this.changed.emit();
  }

  deleteTask(index: number) {
    this.list.tasks.splice(index, 1);
    this.changed.emit();
  }
}
