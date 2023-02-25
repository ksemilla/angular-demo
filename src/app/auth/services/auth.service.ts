import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResult } from '../login/interfaces/login-result';
import { User } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  subject = new BehaviorSubject<boolean>(false)
  user = new BehaviorSubject<User>({
    id: 0,
    username: "",
    isActive: true
  })

  constructor(private http: HttpClient) { }

  login(data: { username: string, password: string }): Observable<LoginResult> {
    return this.http.post<LoginResult>(`${this.apiUrl}/auth`, data)
  }

  logout() {
    this.subject.next(false)
    localStorage.removeItem('token')
  }

  signup(data: { username: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/signup`, data)
  }

  onLogin(): Observable<boolean> {
    return this.subject.asObservable()
  }

  onUserChange(): Observable<User> {
    return this.user.asObservable()
  }

  setUser(user: User): void {
    this.user.next(user)
  }

  verifyToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/auth/verify-token`, { accessToken: token })
  }
}
