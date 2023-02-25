import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Task, TaskName } from 'src/app/tasks/interfaces/task';
import { Item } from '../../interfaces/item';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-add-item[taskName]',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  @Input() taskName: TaskName
  @Input() task: Task
  @Output() onAddItem: EventEmitter<Item> = new EventEmitter()
  loading: boolean = false

  constructor(private itemService: ItemService) { }

  ngOnInit(): void { }

  itemForm = new FormGroup({
    name: new FormControl('')
  })

  async onSubmit() {
    if (this.itemForm.value.name) {
      this.loading = true
      this.itemService.addItem({
        name: this.itemForm.value.name,
        displayOrder: 0,
        task: this.task,
        isArchived: false
      }).subscribe(val => {
        this.onAddItem.emit(val)
        this.itemForm.setValue({ name: "" })
        this.loading = false
      })
    }
  }
}
