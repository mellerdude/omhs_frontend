import { CdkDrag, CdkDropList, CdkDropListGroup,  DragDropModule,
  moveItemInArray,
  transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import {
 
} from '@angular/cdk/drag-drop';

export const basicNG = [
  CommonModule,
  FormsModule,
];

export const basicNav = [
  RouterLink,
  RouterOutlet,
];

export const basicDragDrop = [
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    DragDropModule,
];
