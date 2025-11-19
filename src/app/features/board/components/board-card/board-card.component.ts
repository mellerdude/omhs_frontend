import { Component, EventEmitter, Input, Output } from '@angular/core';
import { basicNG } from '../../../../shared/shared-imports';

interface Task {
  id: string;
  title: string;
}

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [basicNG],
  templateUrl: './board-card.component.html',
})
export class BoardCardComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  editing = false;
  editedTitle = '';

  startEdit() {
    this.editedTitle = this.task.title;
    this.editing = true;
  }

  saveEdit() {
    const title = this.editedTitle.trim();
    if (title) {
      this.task.title = title;
      this.changed.emit();    // 🔥 notify parent
    }
    this.editing = false;
  }
}
