import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryComponent } from '../features/category/view/category/category.component';
import { MatDividerModule } from '@angular/material/divider';
import { TaskComponent } from '../features/tasks/view/task/task.component';

const COMPONENTS = [CategoryComponent, TaskComponent];
const MODULES = [MatDividerModule];

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ...MODULES, ...COMPONENTS],
  template: `<div class="h-screen flex w-full border-4 border-blue-700">
    <app-category class="w-1/4 border-2 border-orange-700" />
    <mat-divider class="h-full opacity-50" />
    <app-task class="w-3/4 border-2 border-orange-400" />
  </div>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
