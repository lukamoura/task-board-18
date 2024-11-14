import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  template: ` <section class="mt-16 mx-12 pl-8">
    <span class="text-2xl font-semibold">Categorias</span>
    <ul class="mt-4 space-y-4">
      @for (category of categories(); track category.id) {
        <li class="font-medium">{{ category.name }}</li>
      }
    </ul>
  </section>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  private readonly categoryService = inject(CategoryService);
  public categories = this.categoryService.categories;
}
