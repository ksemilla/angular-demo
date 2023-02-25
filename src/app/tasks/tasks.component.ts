import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Item } from '../item/interfaces/item';
import { Task } from './interfaces/task';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  @Input() dashboardTasks: Task[]
  todo: Item[] = []
  inProgress: Item[] = []
  review: Item[] = []
  done: Item[] = []

  todoTask: Task
  inProgressTask: Task
  reviewTask: Task
  doneTask: Task

  constructor(private authService: AuthService, private taskService: TasksService) {
    this.authService.user.subscribe(user => {
      if (user) {
        this.taskService.findAll().subscribe(tasks => {
          tasks.forEach(task => {
            switch (task.name) {
              case 'todo':
                this.todo = task.items
                this.todoTask = task
                break;
              case 'in-progress':
                this.inProgress = task.items
                this.inProgressTask = task
                break;
              case 'review':
                this.review = task.items
                this.reviewTask = task
                break;
              case 'done':
                this.done = task.items
                this.doneTask = task
                break;
            }
          })
        })
      }
    })
    this.taskService.serviceTasks.subscribe(tasks => {
      tasks.forEach(task => {
        switch (task.name) {
          case 'todo':
            this.todo = task.items
            this.todoTask = task
            break;
          case 'in-progress':
            this.inProgress = task.items
            this.inProgressTask = task
            break;
          case 'review':
            this.review = task.items
            this.reviewTask = task
            break;
          case 'done':
            this.done = task.items
            this.doneTask = task
            break;
        }
      })
    })
  }

  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      const id = event.container.id
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      if (id === 'cdk-drop-list-0') {
        this.taskService.updateTaskItems([
          {
            ...this.todoTask,
            items: event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
          }
        ]).subscribe()
        this.todo = event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
      } else if (id === 'cdk-drop-list-1') {
        this.taskService.updateTaskItems([
          {
            ...this.inProgressTask,
            items: event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
          }
        ]).subscribe()
        this.inProgress = event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
      } else if (id === 'cdk-drop-list-2') {
        this.taskService.updateTaskItems([
          {
            ...this.reviewTask,
            items: event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
          }
        ]).subscribe()
        this.review = event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
      } else if (id === 'cdk-drop-list-3') {
        this.taskService.updateTaskItems([
          {
            ...this.doneTask,
            items: event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
          }
        ]).subscribe()
        this.done = event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
      }


    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const targetId = event.container.id
      const fromId = event.previousContainer.id
      if (targetId === 'cdk-drop-list-0') {
        this.taskService.updateTaskItems([
          {
            ...this.todoTask,
            items: event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
          }
        ]).subscribe()
        this.todo = event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
      } else if (targetId === 'cdk-drop-list-1') {
        this.taskService.updateTaskItems([
          {
            ...this.inProgressTask,
            items: event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
          }
        ]).subscribe()
        this.inProgress = event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
      } else if (targetId === 'cdk-drop-list-2') {
        this.taskService.updateTaskItems([
          {
            ...this.reviewTask,
            items: event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
          }
        ]).subscribe()
        this.review = event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
      } else if (targetId === 'cdk-drop-list-3') {
        this.taskService.updateTaskItems([
          {
            ...this.doneTask,
            items: event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
          }
        ]).subscribe()
        this.done = event.container.data.map((item, i) => ({ ...item, displayOrder: i }))
      }

      if (fromId === 'cdk-drop-list-0') {
        this.taskService.updateTaskItems([
          {
            ...this.todoTask,
            items: event.previousContainer.data.map((item, i) => ({ ...item, displayOrder: i }))
          }
        ]).subscribe()
        this.todo = event.previousContainer.data.map((item, i) => ({ ...item, displayOrder: i }))
      } else if (fromId === 'cdk-drop-list-1') {
        this.taskService.updateTaskItems([
          {
            ...this.inProgressTask,
            items: event.previousContainer.data.map((item, i) => ({ ...item, displayOrder: i }))
          }
        ]).subscribe()
        this.inProgress = event.previousContainer.data.map((item, i) => ({ ...item, displayOrder: i }))
      } else if (fromId === 'cdk-drop-list-2') {
        this.taskService.updateTaskItems([
          {
            ...this.reviewTask,
            items: event.previousContainer.data.map((item, i) => ({ ...item, displayOrder: i }))
          }
        ]).subscribe()
        this.review = event.previousContainer.data.map((item, i) => ({ ...item, displayOrder: i }))
      } else if (fromId === 'cdk-drop-list-3') {
        this.taskService.updateTaskItems([
          {
            ...this.doneTask,
            items: event.previousContainer.data.map((item, i) => ({ ...item, displayOrder: i }))
          }
        ]).subscribe()
        this.done = event.previousContainer.data.map((item, i) => ({ ...item, displayOrder: i }))
      }
    }
  }

  addItem(item: Item) {
    switch (item.task.name) {
      case 'todo':
        this.todo = [...this.todo, item]
        break;
      case 'in-progress':
        this.inProgress = [...this.inProgress, item]
        break;
      case 'review':
        this.review = [...this.review, item]
        break;
      case 'done':
        this.done = [...this.done, item]
        break;
    }
  }

  updateItem({ item, task }: { item: Item, task: Task }) {
    switch (task.name) {
      case 'todo':
        this.todo[item.displayOrder] = item
        break
      case 'in-progress':
        this.inProgress[item.displayOrder] = item
        break
      case 'review':
        this.review[item.displayOrder] = item
        break
      case 'done':
        this.done[item.displayOrder] = item
        break
    }
  }

  deleteItem({ item, task }: { item: Item, task: Task }) {
    switch (task.name) {
      case 'todo':
        this.todo = this.todo.filter(_item => _item.id !== item.id)
        break
      case 'in-progress':
        this.inProgress = this.inProgress.filter(_item => _item.id !== item.id)
        break
      case 'review':
        this.review = this.review.filter(_item => _item.id !== item.id)
        break
      case 'done':
        this.done = this.done.filter(_item => _item.id !== item.id)
        break
    }
  }

}
