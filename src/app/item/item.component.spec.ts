import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';

import { ItemComponent } from './item.component';
import { ItemService } from './item.service';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let fakeItemService: ItemService

  beforeEach(async () => {
    fakeItemService = jasmine.createSpyObj<ItemService>('ItemService', {
      addItem: of()
    })

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
      ],
      declarations: [ItemComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.item = {
      name: 'test',
      isArchived: false,
      displayOrder: 0,
      task: {
        user: {
          username: 'asd',
          isActive: true,
        },
        name: 'todo',
        items: [],
        isArchived: false
      }
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
