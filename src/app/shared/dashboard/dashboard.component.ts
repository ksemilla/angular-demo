import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Task } from 'src/app/tasks/interfaces/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tasks: Task[]
  constructor(private router: Router, private authService: AuthService) {
    this.authService.subject.subscribe(val => {
      if (!val) this.router.navigate(["/login"])
    })
  }
}
