import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { getHeaders } from '../utils';
import { Task } from './interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiUrl = 'http://localhost:3000'
  serviceTasks = new Subject<Task[]>()
  constructor(private http: HttpClient) { }

  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`, getHeaders())
  }

  updateTaskItems(tasks: Task[]): Observable<Task[]> {
    return this.http.post<Task[]>(`${this.apiUrl}/tasks/update-items`, tasks, getHeaders())
  }

  translateTaskItems(code: string): Observable<Task[]> {
    return this.http.post<Task[]>(`${this.apiUrl}/tasks/translate-items`, { code }, getHeaders())
  }
}
