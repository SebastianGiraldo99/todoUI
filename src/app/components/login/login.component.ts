import {Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    
   }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm?.value.email;
    const password = this.loginForm?.value.password;

    if(username === 'admin@email.com' && password === 'admin') {
      localStorage.setItem('userSession', JSON.stringify({username}));
      this.router.navigate(['/todo-list']).then(() => {
        window.location.reload();
      });
    }
  }

}
