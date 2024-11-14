import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CategoryListComponent } from '../../components/category-list/category-list.component';
import { CategoryTagComponent } from '../../components/category-tag/category-tag.component';
import { CategoryService } from '../../services/category.service';

const COMPONENTS = [CategoryListComponent, CategoryTagComponent];
const MODULES = [CommonModule];
const PIPES = [AsyncPipe];

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [...MODULES, ...COMPONENTS, ...PIPES],
  template: ` <div class="flex flex-col justify-between h-full w-full">
    <app-category-list />
    <app-category-tag />
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {}
