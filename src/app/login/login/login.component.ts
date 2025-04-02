import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, SHARED_IMPORTS],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Output() loggedIn = new EventEmitter<void>();

  
  loading = false;
  error = '';

 

  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }


  submit(): void {
    this.error = '';
    this.loading = true;

    const { username, password } = this.loginForm.value;

    this.authService.login(username!, password!).subscribe({
      next: () => {
        this.loading = false;
        this.loggedIn.emit();
      },
      error: () => {
        this.loading = false;
        this.error = 'שם משתמש או סיסמה שגויים';
      }
    });
  }
}
