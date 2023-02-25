import { Task } from "src/app/tasks/interfaces/task"

export interface Item {
    id?: number,
    name: string
    isArchived: boolean
    displayOrder: number
    task: Task
}