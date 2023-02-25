import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../tasks/interfaces/task';
import { Item } from './interfaces/item';
import { ItemService } from './item.service';

@Component({
  selector: 'app-item[item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() item: Item
  @Input() task: Task
  @Output() onUpdateItem: EventEmitter<{ item: Item, task: Task }> = new EventEmitter()
  @Output() onDeleteItem: EventEmitter<{ item: Item, task: Task }> = new EventEmitter()

  constructor(public dialog: MatDialog, private itemService: ItemService) { }

  showEdit: boolean = false
  ngOnInit(): void { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.item,
      width: "700px"
    });

    dialogRef.afterClosed().subscribe(result => {
      result && result.type === 'update' && this.itemService.updateItem(this.item.id ?? 0, result.item).subscribe(_val => {
        this.onUpdateItem.emit({ item: result.item, task: this.task })
      })
      result && result.type === 'delete' && this.itemService.deleteItem(this.item.id ?? 0).subscribe(_val => {
        this.onDeleteItem.emit({ item: this.item, task: this.task })
      })
    });
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.itemForm.setValue({
      name: this.data.name
    })
  }

  itemForm = new FormGroup({
    name: new FormControl('')
  })

  onNoClick() {
    this.dialogRef.close()
    this.itemService.deleteItem(this.data.id ?? 0).subscribe()
  }

  getNewData(type: 'update' | 'delete'): { type: 'update' | 'delete', item: Item } {
    return {
      type,
      item: {
        ...this.data,
        name: this.itemForm.value.name ?? ''
      }
    }
  }
}

