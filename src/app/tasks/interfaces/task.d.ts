import { Item } from "src/app/item/interfaces/item"
import { User } from "src/app/types"

export type TaskName = 'todo' | 'in-progress' | 'review' | 'done'

export interface Task {
    id?: number
    user: User
    name: TaskName
    items: Item[]
    isArchived: boolean
}

