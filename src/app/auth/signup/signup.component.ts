import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/services/auth.service';

export function confirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;
    const password = control.parent?.value['password']

    if (!value) {
      return null;
    }

    if (password !== value) {
      return {
        confirmPassword: true
      }
    } else {
      control.setErrors(null)
      return null
    }

  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private _snackbar: MatSnackBar, private authService: AuthService) { }
  color: ThemePalette = 'primary'
  loading: boolean = false
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [Validators.required, confirmPasswordValidator()])
  })

  signup() {
    if (this.loginForm.valid) {
      this.authService.signup({
        username: this.loginForm.value.username ?? "",
        password: this.loginForm.value.password ?? ""
      }).subscribe({
        next: (_val) => {
          this._snackbar.open('Account created!', "Close", {
            duration: 5000,
            horizontalPosition: "right"
          })
        },
        error: (error) => {
          this._snackbar.open(error.error.message, 'Close', {
            horizontalPosition: "right"
          })
        }
      })
    }
  }

  get confirmPassword() {
    return this.loginForm.get("confirmPassword")
  }
}
