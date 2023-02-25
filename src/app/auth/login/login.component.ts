import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from "@angular/router"
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { parseJwt } from 'src/app/utils';
import { User } from 'src/app/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  subscription: Subscription
  loading: boolean = false
  isLogged: boolean = false
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private _snackbar: MatSnackBar) {
    this.subscription = this.authService.onLogin().subscribe(val => {
      if (val) router.navigate(["/"])
      return this.isLogged = val
    })
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  login() {
    if (this.loginForm.valid) {
      this.loading = true

      // TODO: CHANGE THIS CODE
      this.authService.login({
        username: this.loginForm.value.username ?? "",
        password: this.loginForm.value.password ?? ""
      }).subscribe({
        next: ({ accessToken }) => {
          this.loading = false
          this.authService.subject.next(true)
          localStorage.setItem('token', accessToken)
          const decoded: User = parseJwt(accessToken)
          const user: User = {
            id: decoded.id,
            username: decoded.username,
            isActive: decoded.isActive
          }
          this.authService.user.next(user)
        },
        error: (error) => {
          this.loading = false
          this._snackbar.open(error.error.message, 'Close', {
            duration: 5000,
            horizontalPosition: "right"
          })
        }
      })
    }
  }
}
