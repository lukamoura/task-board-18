import { categoryBackgroundColors } from './../../constants/category-colors';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-tag',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  template: `
    <section class="flex flex-col gap-4">
      <mat-divider class="opacity-50" />
      <div class="flex flex-wrap justify-center item-center px-2 py-4 gap-4">
        @for (category of categories(); track category.id) {
          <span
            class="flex items-center justify-center select-none opacity-80 hover:opacity-100 {{
              categoryBackgroundColors[category.color]
            }} text-white px-4 py-2 rounded-2xl text-center w-[80px] font-semibold">
            {{ category.name }}
          </span>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryTagComponent {
  private readonly categoryService = inject(CategoryService);
  public categories = this.categoryService.categories;
  public categoryBackgroundColors = categoryBackgroundColors;
}
