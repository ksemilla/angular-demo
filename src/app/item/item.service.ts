import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getHeaders } from '../utils';
import { Item } from './interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/items/create`, item, getHeaders())
  }

  updateItem(id: number, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/items/${item.id}`, item, getHeaders())
  }

  deleteItem(id: number): Observable<Item> {
    return this.http.delete<Item>(`${this.apiUrl}/items/${id}`, getHeaders())
  }
}
