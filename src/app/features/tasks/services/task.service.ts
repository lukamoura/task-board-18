import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Task } from '../model/task.model';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _httpClient = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  public tasks = signal<Task[]>([]);

  public numberOfTasks = computed(() => this.tasks().length);

  public getTasks(): Observable<Task[]> {
    return this._httpClient.get<Task[]>(`${this.apiUrl}/tasks`).pipe(
      tap(tasks => {
        const sortedTasks = this.getSortedTasks(tasks);
        this.tasks.set(sortedTasks);
      })
    );
  }

  public createTask(task: Partial<Task>): Observable<Task> {
    return this._httpClient.post<Task>(`${this.apiUrl}/tasks`, task);
  }

  public insertATaskinList(neuTask: Task): void {
    const updatedTasks = [...this.tasks(), neuTask];
    const sortedTasks = this.getSortedTasks(updatedTasks);
    this.tasks.set(sortedTasks);
  }

  public updateTask(task: Task): Observable<Task> {
    return this._httpClient.put<Task>(`${this.apiUrl}/tasks/${task.id}`, task);
  }

  public updateTaskInList(updatedTask: Task): void {
    this.tasks.update(tasks => {
      const allTasksWithUpdatedTaskRemoved = tasks.filter(
        task => task.id !== updatedTask.id
      );

      const updatedTasks = [...allTasksWithUpdatedTaskRemoved, updatedTask];
      return this.getSortedTasks(updatedTasks);
    });
  }

  public updateIsCompleted(
    taskId: number,
    isCompleted: boolean
  ): Observable<Task> {
    return this._httpClient
      .patch<Task>(`${this.apiUrl}/tasks/${taskId}`, {
        isCompleted,
      })
      .pipe(tap(task => this.updateTaskInList(task)));
  }

  public deleteTask(taskId: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.apiUrl}/tasks/${taskId}`);
  }

  public deleteATaskinList(taskId: number): void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
  }

  public getSortedTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => a.title.localeCompare(b.title));
  }
}
