import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { basicNG } from '../../../../shared/shared-imports';
import 'emoji-picker-element';
import { Task } from '../../../../core/services/kanban.service';
import { Picker } from 'emoji-picker-element';

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [basicNG],
  templateUrl: './board-card.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BoardCardComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  editing = false;
  editedTitle = '';
  showPicker = false;

  startEdit() {
    this.editedTitle = this.task.title;
    this.editing = true;
  }

  saveEdit() {
    const title = this.editedTitle.trim();
    if (title) {
      this.task.title = title;
      this.changed.emit();
    }
    this.editing = false;
  }

  pickerLeft = 0;
  pickerTop = 0;

  togglePicker(event: MouseEvent) {
    event.stopPropagation();

    this.showPicker = !this.showPicker;

    if (this.showPicker) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      this.pickerLeft = rect.left;
      this.pickerTop = rect.bottom + 6;
    }
  }

  selectEmoji(event: any) {
    this.task.emoji = event.detail.unicode;
    this.showPicker = false;
    this.changed.emit();
  }

  @HostListener('document:click')
  closePicker() {
    this.showPicker = false;
  }
}
