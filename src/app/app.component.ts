import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { User } from './types';
import { parseJwt } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-demo';
  loading = true

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    if (token) {
      this.authService.verifyToken(token).subscribe(val => {
        if (val) {
          this.authService.subject.next(true)
          const decoded: User = parseJwt(token)
          const user: User = {
            id: decoded.id,
            username: decoded.username,
            isActive: decoded.isActive
          }
          this.authService.user.next(user)
          this.loading = false
        }
        else {
          localStorage.removeItem('token')
          this.loading = false
        }
      })
    } else {
      this.loading = false
    }
  }

}
