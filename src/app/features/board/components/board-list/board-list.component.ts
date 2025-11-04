import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { BoardCardComponent } from '../board-card/board-card.component';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

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
  imports: [NgIf, NgFor, FormsModule, BoardCardComponent, DragDropModule],
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
